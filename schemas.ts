import mongoose, { Schema, Document } from 'mongoose';

export enum ShipType {
  Battleship = 'battleship',
  Cruiser = 'cruiser',
  Destroyer = 'destroyer',
  Submarine = 'submarine'
}

export enum ShipOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

//NOTE: Keep in mind that latitude points north, so point [0,0] is the lower left corner of the grid.
export const ShipSchema = new Schema(
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
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

export interface IShip extends Document {
  type: ShipType;
  orientation: ShipOrientation;
  latitude: number;
  longitude: number;
}

export const ShipModel = mongoose.model<IShip>('ShipModel', ShipSchema);

export const ShotSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

export interface IShot extends Document {
  latitude: number;
  longitude: number;
}

export const ShotModel = mongoose.model<IShot>('ShotModel', ShotSchema);
