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

export const ShipModel = mongoose.model<IShip>('Ship', ShipSchema);

//Hit status CAN be deduced from other data, so it doesn't need to be stored separately.
//But an argument could also be made that it is very useful static information set only once on creation. (Data integrity is not compromised)
export const ShotSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    hit: { type: Schema.Types.ObjectId, ref: 'Ship' },
    didSinkShip: { type: Boolean }
  },
  {
    timestamps: true
  }
);

export interface IShot extends Document {
  latitude: number;
  longitude: number;
  hit?: IShip;
  didSinkShip?: boolean;
  createdAt: Date;
}

export const ShotModel = mongoose.model<IShot>('Shot', ShotSchema);
