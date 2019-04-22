const mongoose = require('mongoose');
const { ShipSchema, ShotSchema } = require('./schemas');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/battleship', {
  useNewUrlParser: true,
  keepAlive: true
});

const Ship = mongoose.model('Ship', ShipSchema);
const Shot = mongoose.model('Shot', ShotSchema);

exports.Ship = Ship;
exports.Shot = Shot;
