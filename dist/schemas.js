"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var ShipType;
(function (ShipType) {
    ShipType["Battleship"] = "battleship";
    ShipType["Cruiser"] = "cruiser";
    ShipType["Destroyer"] = "destroyer";
    ShipType["Submarine"] = "submarine";
})(ShipType = exports.ShipType || (exports.ShipType = {}));
var ShipOrientation;
(function (ShipOrientation) {
    ShipOrientation["Horizontal"] = "horizontal";
    ShipOrientation["Vertical"] = "vertical";
})(ShipOrientation = exports.ShipOrientation || (exports.ShipOrientation = {}));
//NOTE: Keep in mind that latitude points north, so point [0,0] is the lower left corner of the grid.
exports.ShipSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
exports.ShipModel = mongoose_1.default.model('ShipModel', exports.ShipSchema);
exports.ShotSchema = new mongoose_1.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
}, {
    timestamps: true
});
exports.ShotModel = mongoose_1.default.model('ShotModel', exports.ShotSchema);
//# sourceMappingURL=schemas.js.map