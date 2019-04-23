import mongoose from 'mongoose';
import { ShipSchema, ShotSchema } from './schemas';

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/battleship', {
  useNewUrlParser: true,
  keepAlive: true
});

export const Ship = mongoose.model('Ship', ShipSchema);
export const Shot = mongoose.model('Shot', ShotSchema);
