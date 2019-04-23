const { Schema } = require('mongoose');

//NOTE: Keep in mind that latitude points north, so point [0,0] is the lower left corner of the grid.
const ShipSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['battleship', 'cruiser', 'destroyer', 'submarine']
    },
    orientation: {
      type: String,
      required: true,
      enum: ['horizontal', 'vertical']
    },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const ShotSchema = new Schema(
  {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = { ShipSchema, ShotSchema };
