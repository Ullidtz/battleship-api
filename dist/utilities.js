'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var schemas_1 = require('./schemas');
exports.areCoordinatesWithinGrid = function(latitude, longitude) {
  return longitude >= 0 && latitude >= 0 && longitude < 10 && latitude < 10;
};
exports.getShipLengthFromType = function(type) {
  switch (type) {
    case schemas_1.ShipType.Battleship:
      return 4;
    case 'cruiser': //TODO : Finish this
      return 3;
    case 'destroyer':
      return 2;
    case 'submarine':
      return 1;
    default:
      throw new Error('Unknown ship type');
  }
};
exports.doesShipFitInsideGrid = function(ship) {
  var length = exports.getShipLengthFromType(ship.type);
  if (ship.orientation === 'vertical') {
    return Number(ship.latitude) + length < 10;
  } else {
    return Number(ship.longitude) + length < 10;
  }
};
exports.didShotHit = function(latitude, longitude, ships) {
  for (var _i = 0, ships_1 = ships; _i < ships_1.length; _i++) {
    var ship = ships_1[_i];
    if (
      exports.doesPointIntersectWithShip(
        Number(latitude),
        Number(longitude),
        ship
      )
    ) {
      return true;
    }
  }
  return false;
};
exports.doesPointIntersectWithShip = function(
  latitude,
  longitude,
  ship,
  bufferZone
) {
  if (bufferZone === void 0) {
    bufferZone = 0;
  }
  var shipLength = exports.getShipLengthFromType(ship.type);
  if (ship.orientation === 'vertical') {
    var long = ship.longitude;
    for (var lat = ship.latitude; lat < ship.latitude + shipLength; lat++) {
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
    var lat = ship.latitude;
    for (
      var long = ship.longitude;
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
exports.doShipsIntersectOrTouch = function(lhs, rhs) {
  var lhsLength = exports.getShipLengthFromType(lhs.type);
  if (lhs.orientation === 'vertical') {
    var long = lhs.longitude;
    for (var lat = lhs.latitude; lat < lhs.latitude + lhsLength; lat++) {
      if (exports.doesPointIntersectWithShip(lat, long, rhs, 1)) {
        return true;
      }
    }
  } else {
    var lat = lhs.latitude;
    for (var long = lhs.longitude; long < lhs.longitude + lhsLength; long++) {
      if (exports.doesPointIntersectWithShip(lat, long, rhs, 1)) {
        return true;
      }
    }
  }
  return false;
};
//# sourceMappingURL=utilities.js.map
