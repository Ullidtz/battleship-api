const assert = require('assert');
const {
  areCoordinatesWithinGrid,
  doesShipFitInsideGrid,
  doShipsIntersectOrTouch,
  didShotHit
} = require('../dist/utilities');

describe('utilities', function() {
  describe('areCoordinatesWithinGrid', function() {
    it('should return true for coordinates [0,0]', function() {
      assert.equal(areCoordinatesWithinGrid(0, 0), true);
    });
    it('should return false for coordinates [0,10]', function() {
      assert.equal(areCoordinatesWithinGrid(0, 10), false);
    });
    it('should return true for coordinates [9,9]', function() {
      assert.equal(areCoordinatesWithinGrid(9, 9), true);
    });
    it('should return false for coordinates [0,-1]', function() {
      assert.equal(areCoordinatesWithinGrid(0, -1), false);
    });
  });

  describe('doesShipFitInsideGrid', function() {
    it('should return true for coordinates [0,0]: battleship (vertical)', function() {
      assert.equal(
        doesShipFitInsideGrid({
          latitude: 0,
          longitude: 0,
          type: 'battleship',
          orientation: 'vertical'
        }),
        true
      );
    });
    it('should return true for coordinates [5,0]: battleship (vertical)', function() {
      assert.equal(
        doesShipFitInsideGrid({
          latitude: 5,
          longitude: 0,
          type: 'battleship',
          orientation: 'vertical'
        }),
        true
      );
    });
    it('should return false for coordinates [6,0]: battleship (vertical)', function() {
      assert.equal(
        doesShipFitInsideGrid({
          latitude: 6,
          longitude: 0,
          type: 'battleship',
          orientation: 'vertical'
        }),
        false
      );
    });
    it('should return true for coordinates [0,6]: cruiser (horizontal)', function() {
      assert.equal(
        doesShipFitInsideGrid({
          latitude: 0,
          longitude: 6,
          type: 'cruiser',
          orientation: 'horizontal'
        }),
        true
      );
    });
    it('should return false for coordinates [0,7]: cruiser (horizontal)', function() {
      assert.equal(
        doesShipFitInsideGrid({
          latitude: 0,
          longitude: 7,
          type: 'cruiser',
          orientation: 'horizontal'
        }),
        false
      );
    });
    it('should return false for coordinates [0,-1]: cruiser (horizontal)', function() {
      assert.equal(
        doesShipFitInsideGrid({
          latitude: 0,
          longitude: 7,
          type: 'cruiser',
          orientation: 'horizontal'
        }),
        false
      );
    });
  });

  describe('doShipsIntersectOrTouch', function() {
    it('should return false for coordinates [0,4]: cruiser (vertical) vs [4,4]: cruiser (horizontal)', function() {
      assert.equal(
        doShipsIntersectOrTouch(
          {
            latitude: 0,
            longitude: 4,
            type: 'cruiser',
            orientation: 'vertical'
          },
          {
            latitude: 4,
            longitude: 4,
            type: 'cruiser',
            orientation: 'horizontal'
          }
        ),
        false
      );
    });
    it('should return true for coordinates [0,4]: cruiser (vertical) vs [3,4]: cruiser (horizontal) - (Touching)', function() {
      assert.equal(
        doShipsIntersectOrTouch(
          {
            latitude: 0,
            longitude: 4,
            type: 'cruiser',
            orientation: 'vertical'
          },
          {
            latitude: 3,
            longitude: 4,
            type: 'cruiser',
            orientation: 'horizontal'
          }
        ),
        true
      );
    });
    it('should return true for coordinates [0,4]: cruiser (vertical) vs [3,4]: cruiser (horizontal) - (Touching corners)', function() {
      assert.equal(
        doShipsIntersectOrTouch(
          {
            latitude: 0,
            longitude: 3,
            type: 'cruiser',
            orientation: 'vertical'
          },
          {
            latitude: 3,
            longitude: 4,
            type: 'cruiser',
            orientation: 'horizontal'
          }
        ),
        true
      );
    });
    it('should return true for coordinates [0,3]: cruiser (vertical) vs [1,2]: cruiser (horizontal) - (Intersecting)', function() {
      assert.equal(
        doShipsIntersectOrTouch(
          {
            latitude: 0,
            longitude: 3,
            type: 'cruiser',
            orientation: 'vertical'
          },
          {
            latitude: 1,
            longitude: 2,
            type: 'cruiser',
            orientation: 'horizontal'
          }
        ),
        true
      );
    });
  });

  describe('didShotHit - Ships: [0,4]: cruiser (vertical) and [4,4]: cruiser (horizontal)', function() {
    const ships = [
      {
        latitude: 0,
        longitude: 4,
        type: 'cruiser',
        orientation: 'vertical'
      },
      {
        latitude: 4,
        longitude: 4,
        type: 'cruiser',
        orientation: 'horizontal'
      }
    ];
    it('should return false for coordinates [0,0]', function() {
      assert.equal(didShotHit(0, 0, ships), false);
    });
    it('should return true for coordinates [0,4]', function() {
      assert.equal(didShotHit(0, 4, ships), true);
    });
    it('should return true for coordinates [1,4]', function() {
      assert.equal(didShotHit(1, 4, ships), true);
    });
    it('should return true for coordinates [2,4]', function() {
      assert.equal(didShotHit(2, 4, ships), true);
    });
    it('should return false for coordinates [3,4]', function() {
      assert.equal(didShotHit(3, 4, ships), false);
    });
    it('should return true for coordinates [4,4]', function() {
      assert.equal(didShotHit(4, 4, ships), true);
    });
    it('should return true for coordinates [4,5]', function() {
      assert.equal(didShotHit(4, 5, ships), true);
    });
    it('should return true for coordinates [4,6]', function() {
      assert.equal(didShotHit(4, 6, ships), true);
    });
    it('should return false for coordinates [4,7]', function() {
      assert.equal(didShotHit(4, 7, ships), false);
    });
  });
});
