const areCoordinatesWithinGrid = (latitude, longitude) => {
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
  let length = getShipLengthFromType(ship.type);
  if (ship.orientation === 'vertical') {
    return Number(ship.latitude) + length < 10;
  } else {
    return Number(ship.longitude) + length < 10;
  }
};

const didShotHit = (latitude, longitude, ships) => {
  for (let ship of ships) {
    if (doesPointIntersectWithShip(Number(latitude), Number(longitude), ship)) {
      console.log(
        'You stupid computer thinking this is a hit when its not... ship:',
        ship
      );
      return true;
    }
  }
  return false;
};

const doesPointIntersectWithShip = (
  latitude,
  longitude,
  ship,
  bufferZone = 0
) => {
  let shipLength = getShipLengthFromType(ship.type);
  if (ship.orientation === 'vertical') {
    let long = ship.longitude;
    for (let lat = ship.latitude; lat < ship.latitude + shipLength; lat++) {
      if (
        lat <= latitude + bufferZone &&
        lat >= latitude - bufferZone &&
        long <= longitude + bufferZone &&
        long >= longitude - bufferZone
      ) {
        return true;
      }
    }
  } else {
    let lat = ship.latitude;
    for (
      let long = ship.longitude;
      long < ship.longitude + shipLength;
      long++
    ) {
      if (
        lat <= latitude + bufferZone &&
        lat >= latitude - bufferZone &&
        long <= longitude + bufferZone &&
        long >= longitude - bufferZone
      ) {
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
    for (let lat = lhs.latitude; lat < lhs.latitude + lhsLength; lat++) {
      if (doesPointIntersectWithShip(lat, long, rhs, 1)) {
        return true;
      }
    }
  } else {
    let lat = lhs.latitude;
    for (let long = lhs.longitude; long < lhs.longitude + lhsLength; long++) {
      if (doesPointIntersectWithShip(lat, long, rhs, 1)) {
        return true;
      }
    }
  }

  return false;
};

module.exports = {
  areCoordinatesWithinGrid,
  getShipLengthFromType,
  doesShipFitInsideGrid,
  didShotHit,
  doesPointIntersectWithShip,
  doShipsIntersectOrTouch
};
