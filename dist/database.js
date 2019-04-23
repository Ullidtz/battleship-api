"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schemas_1 = require("./schemas");
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.Promise = global.Promise;
var db = mongoose_1.default.connect('mongodb://localhost:27017/battleship', {
    useNewUrlParser: true,
    keepAlive: true
});
exports.Ship = mongoose_1.default.model('Ship', schemas_1.ShipSchema);
exports.Shot = mongoose_1.default.model('Shot', schemas_1.ShotSchema);
//# sourceMappingURL=database.js.map