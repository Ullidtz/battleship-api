const { Ship, Shot } = require('./database');

//TODO:
// - TypeScript
// - Mocha tests

const areCoordinatesWithinGrid = (longitude, latitude) => {
  return longitude >= 0 && latitude >= 0 && longitude < 10 && latitude < 10;
};

const getShipLengthFromType = type => {
  switch (type) {
    case 'battleship':
      return 4;
    case 'cruiser':
      return 3;
    case 'destroyer':
      return 2;
    case 'submarine':
      return 1;
    default:
      throw new Error('Unknown ship type');
  }
};

const doesShipFitInsideGrid = ship => {
  throw new Error('Not inomeplemeneted');
  return false;
};

const doesPointIntersectWithShip = (longitude, latitude, ship) => {
  let shipLength = getShipLengthFromType(ship.type);

  if (ship.orientation === 'vertical') {
    let long = ship.longitude;
    for (let lat = ship.latitude; lat <= ship.latitude + shipLength; lat++) {
      console.log('plat:', lat);
      console.log('plong:', long);
      if (lat === latitude && long === longitude) {
        return true;
      }
    }
  } else {
    let lat = ship.latitude;
    for (
      let long = ship.longitude;
      long <= ship.longitude + shipLength;
      long++
    ) {
      console.log('plat:', lat);
      console.log('plong:', long);
      if (lat === latitude && long === longitude) {
        return true;
      }
    }
  }
  return false;
};

const doShipsIntersectOrTouch = (lhs, rhs) => {
  let lhsLength = getShipLengthFromType(lhs.type);

  if (lhs.orientation === 'vertical') {
    let long = lhs.longitude;
    for (let lat = lhs.latitude; lat <= lhs.latitude + lhsLength; lat++) {
      console.log('lat:', lat);
      console.log('long:', long);
      if (doesPointIntersectWithShip(lat, long, rhs)) {
        return true;
      }
    }
  } else {
    let lat = lhs.latitude;
    for (let long = lhs.longitude; long <= lhs.longitude + lhsLength; long++) {
      console.log('lat:', lat);
      console.log('long:', long);
      if (doesPointIntersectWithShip(lat, long, rhs)) {
        return true;
      }
    }
  }

  return false;
};

class ShipRepository {
  get() {
    return Ship.find();
  }

  async create(latitude, longitude, type, orientation) {
    //Verify coordinates to ensure they are within the grid.
    if (!areCoordinatesWithinGrid(latitude, longitude)) {
      throw new Error(
        `Coordinates are outside the grid: [${latitude},${longitude}]`
      );
    }

    //TODO: doesShipFitInsideGrid

    const ships = await this.get();
    //Make sure the ship type is available
    switch (type) {
      case 'battleship':
        if (ships.filter(o => o.type === 'battleship').length >= 1) {
          throw new Error('All battleships have already been deployed.');
        }
        break;
      case 'cruiser':
        if (ships.filter(o => o.type === 'cruiser').length >= 2) {
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
        })
      ) {
        throw new Error(
          'Illagal ship placement, intersecting or touchging another ship'
        );
      }
    }

    let result = await Ship.create({ latitude, longitude, type, orientation });

    return true;
  }

  async reset() {}
}

class ShotRepository {
  get() {
    return Shot.find();
  }

  async create(latitude, longitude) {
    //Verify coordinates to ensure they are within the grid.
    if (!areCoordinatesWithinGrid(latitude, longitude)) {
      throw new Error(
        `Coordinates are outside the grid: [${latitude},${longitude}]`
      );
    }
    //Make sure we haven't shot here yet
    let found = await Shot.find({ latitude, longitude });
    console.log('found', found);
    if (found) {
      throw new Error('A shot has already been fired at this location.');
    }
    return true;
  }

  async reset() {}
}

module.exports = { ShipRepository, ShotRepository };
