import { Ship, Shot } from './database';
import { ShipType, ShipOrientation, IShip } from './schemas';
import {
  areCoordinatesWithinGrid,
  doesShipFitInsideGrid,
  didShotHit,
  doShipsIntersectOrTouch
} from './utilities';
import AuthorizationError from './AuthorizationError';

//TODO:
// - Mocha tests

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
    let ships = await ShipRepository.instance().get();
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
    return didShotHit(latitude, longitude, ships as [IShip]);
  }

  reset() {
    return Shot.deleteMany({});
  }
}
