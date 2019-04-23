import { ShipType, IShip } from './schemas';

export const areCoordinatesWithinGrid = (
  latitude: number,
  longitude: number
): boolean => {
  return longitude >= 0 && latitude >= 0 && longitude < 10 && latitude < 10;
};

export const getShipLengthFromType = (type: ShipType): number => {
  switch (type) {
    case ShipType.Battleship:
      return 4;
    case ShipType.Cruiser:
      return 3;
    case ShipType.Destroyer:
      return 2;
    case ShipType.Submarine:
      return 1;
    default:
      throw new Error('Unknown ship type');
  }
};

export const doesShipFitInsideGrid = (ship: IShip): boolean => {
  let length = getShipLengthFromType(ship.type);
  if (ship.orientation === 'vertical') {
    return Number(ship.latitude) + length < 10;
  } else {
    return Number(ship.longitude) + length < 10;
  }
};

export const didShotHit = (
  latitude: number,
  longitude: number,
  ships: [IShip]
): boolean => {
  for (let ship of ships) {
    if (doesPointIntersectWithShip(Number(latitude), Number(longitude), ship)) {
      return true;
    }
  }
  return false;
};

export const doesPointIntersectWithShip = (
  latitude: number,
  longitude: number,
  ship: IShip,
  bufferZone: number = 0
): boolean => {
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

export const doShipsIntersectOrTouch = (lhs: IShip, rhs: IShip) => {
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
