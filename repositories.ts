import { Ship, Shot } from './database';
import { ShipType, ShipOrientation, IShip, IShot } from './schemas';
import {
  areCoordinatesWithinGrid,
  doesShipFitInsideGrid,
  getShipFromShot,
  doShipsIntersectOrTouch,
  getShipLengthFromType
} from './utilities';
import AuthorizationError from './AuthorizationError';

export class ShipRepository {
  static instance() {
    return new this();
  }

  get() {
    return Ship.find();
  }

  async create(
    latitude: number,
    longitude: number,
    type: ShipType,
    orientation: ShipOrientation
  ) {
    //Verify coordinates to ensure they are within the grid.
    if (!areCoordinatesWithinGrid(latitude, longitude)) {
      throw new Error(
        `Coordinates are outside the grid: [${latitude},${longitude}]`
      );
    }

    if (
      !doesShipFitInsideGrid({
        latitude,
        longitude,
        type,
        orientation
      } as IShip)
    ) {
      throw new Error('Ship does not fit inside grid');
    }

    const ships: [IShip] = (await this.get()) as [IShip];
    //Make sure the ship type is available
    switch (type) {
      case 'battleship':
        if (ships.filter(o => o.type === ShipType.Battleship).length >= 1) {
          throw new Error('All battleships have already been deployed.');
        }
        break;
      case 'cruiser':
        if (ships.filter(o => o.type === ShipType.Cruiser).length >= 2) {
          throw new Error('All cruisers have already been deployed.');
        }
        break;
      case 'destroyer':
        if (ships.filter(o => o.type === 'destroyer').length >= 3) {
          throw new Error('All destroyers have already been deployed.');
        }
        break;
      case 'submarine':
        if (ships.filter(o => o.type === 'submarine').length >= 4) {
          throw new Error('All submarines have already been deployed.');
        }
        break;
      default:
        throw new Error('Unknown ship type');
    }

    //Make sure ship doesn't intersect with other ships
    for (let ship of ships) {
      if (
        doShipsIntersectOrTouch(ship, {
          latitude,
          longitude,
          type,
          orientation
        } as IShip)
      ) {
        throw new Error(
          'Illagal ship placement, intersecting or touching another ship'
        );
      }
    }

    let result = await Ship.create({ latitude, longitude, type, orientation });
    return result;
  }

  reset() {
    return Ship.deleteMany({});
  }
}

export class ShotRepository {
  static instance() {
    return new this();
  }

  get() {
    return Shot.find();
  }

  async create(latitude: number, longitude: number) {
    //Make sure all ships have been placed.
    let ships = (await ShipRepository.instance().get()) as [IShip];
    if (ships.length < 9) {
      throw new AuthorizationError('Not all ships have been placed.');
    }

    //Verify coordinates to ensure they are within the grid.
    if (!areCoordinatesWithinGrid(latitude, longitude)) {
      throw new Error(
        `Coordinates are outside the grid: [${latitude},${longitude}]`
      );
    }

    //Make sure we haven't shot here yet
    let found = await Shot.findOne({ latitude, longitude });
    if (found) {
      throw new Error('A shot has already been fired at this location.');
    }

    let shot = await Shot.create({ latitude, longitude });
    let ship = getShipFromShot(latitude, longitude, ships as [IShip]);
    if (ship === null) {
      return 'Miss';
    }

    let allShots = (await Shot.find({})) as [IShip];
    let sankShip = isShipSunk(ship, allShots);
    if (sankShip) {
      for (let shipIt of ships) {
        if (
          ship.latitude === shipIt.latitude &&
          ship.longitude === shipIt.longitude
        ) {
          continue;
        }

        let sunk = isShipSunk(shipIt, allShots);
        if (!sunk) {
          return `You just sank the ${ship.type}`;
        }
      }

      //Consider: Since this only happens once at the end of the game it may not be worth saving hit status in DB.
      // - But it is rather useful to have it, we could even do a count to see how many times a ship has been hit, telling us if it sunk....
      // It's possible to recheck here, but the other solution seems better in the long run. (The hit status of a shot can't change after it's been fired either, there should be no loss of data integrity)
      return `Game over. ${allShots.length} shots fired. ${allShots.filter(o => o.)} shots missed`; //TODO: It seems storing the hit status may be a good advantage here, and while it can be deduced from toher data, it is also available at the moment of creation and storing it will save us queries.)
    }

    return 'Hit';
  }

  reset() {
    return Shot.deleteMany({});
  }
}

const isShipSunk = (ship: IShip, shots: [IShot]) => {
  let sankShip = true;
  let length = getShipLengthFromType(ship.type);
  if (ship.orientation === ShipOrientation.Horizontal) {
    for (let i = ship.longitude; i < ship.longitude + length; i++) {
      let foundHit = shots.filter(
        o => o.latitude === ship.latitude && o.longitude === i
      );
      if (!foundHit) {
        sankShip = false;
      }
    }
  } else {
    for (let i = ship.latitude; i < ship.latitude + length; i++) {
      let foundHit = shots.filter(
        o => o.longitude === ship.longitude && o.latitude === i
      );
      if (!foundHit) {
        sankShip = false;
      }
    }
  }
  return sankShip;
};
