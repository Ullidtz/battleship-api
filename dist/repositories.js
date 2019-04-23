"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
var schemas_1 = require("./schemas");
var utilities_1 = require("./utilities");
var AuthorizationError_1 = __importDefault(require("./AuthorizationError"));
//TODO:
// - Mocha tests
var ShipRepository = /** @class */ (function () {
    function ShipRepository() {
    }
    ShipRepository.instance = function () {
        return new this();
    };
    ShipRepository.prototype.get = function () {
        return database_1.Ship.find();
    };
    ShipRepository.prototype.create = function (latitude, longitude, type, orientation) {
        return __awaiter(this, void 0, void 0, function () {
            var ships, _i, ships_1, ship, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Verify coordinates to ensure they are within the grid.
                        if (!utilities_1.areCoordinatesWithinGrid(latitude, longitude)) {
                            throw new Error("Coordinates are outside the grid: [" + latitude + "," + longitude + "]");
                        }
                        if (!utilities_1.doesShipFitInsideGrid({
                            latitude: latitude,
                            longitude: longitude,
                            type: type,
                            orientation: orientation
                        })) {
                            throw new Error('Ship does not fit inside grid');
                        }
                        return [4 /*yield*/, this.get()];
                    case 1:
                        ships = (_a.sent());
                        //Make sure the ship type is available
                        switch (type) {
                            case 'battleship':
                                if (ships.filter(function (o) { return o.type === schemas_1.ShipType.Battleship; }).length >= 1) {
                                    throw new Error('All battleships have already been deployed.');
                                }
                                break;
                            case 'cruiser':
                                if (ships.filter(function (o) { return o.type === schemas_1.ShipType.Cruiser; }).length >= 2) {
                                    throw new Error('All cruisers have already been deployed.');
                                }
                                break;
                            case 'destroyer':
                                if (ships.filter(function (o) { return o.type === 'destroyer'; }).length >= 3) {
                                    throw new Error('All destroyers have already been deployed.');
                                }
                                break;
                            case 'submarine':
                                if (ships.filter(function (o) { return o.type === 'submarine'; }).length >= 4) {
                                    throw new Error('All submarines have already been deployed.');
                                }
                                break;
                            default:
                                throw new Error('Unknown ship type');
                        }
                        //Make sure ship doesn't intersect with other ships
                        for (_i = 0, ships_1 = ships; _i < ships_1.length; _i++) {
                            ship = ships_1[_i];
                            if (utilities_1.doShipsIntersectOrTouch(ship, {
                                latitude: latitude,
                                longitude: longitude,
                                type: type,
                                orientation: orientation
                            })) {
                                throw new Error('Illagal ship placement, intersecting or touching another ship');
                            }
                        }
                        return [4 /*yield*/, database_1.Ship.create({ latitude: latitude, longitude: longitude, type: type, orientation: orientation })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ShipRepository.prototype.reset = function () {
        return database_1.Ship.deleteMany({});
    };
    return ShipRepository;
}());
exports.ShipRepository = ShipRepository;
var ShotRepository = /** @class */ (function () {
    function ShotRepository() {
    }
    ShotRepository.instance = function () {
        return new this();
    };
    ShotRepository.prototype.get = function () {
        return database_1.Shot.find();
    };
    ShotRepository.prototype.create = function (latitude, longitude) {
        return __awaiter(this, void 0, void 0, function () {
            var ships, found, shot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ShipRepository.instance().get()];
                    case 1:
                        ships = _a.sent();
                        if (ships.length < 9) {
                            throw new AuthorizationError_1.default('Not all ships have been placed.');
                        }
                        //Verify coordinates to ensure they are within the grid.
                        if (!utilities_1.areCoordinatesWithinGrid(latitude, longitude)) {
                            throw new Error("Coordinates are outside the grid: [" + latitude + "," + longitude + "]");
                        }
                        return [4 /*yield*/, database_1.Shot.findOne({ latitude: latitude, longitude: longitude })];
                    case 2:
                        found = _a.sent();
                        if (found) {
                            throw new Error('A shot has already been fired at this location.');
                        }
                        return [4 /*yield*/, database_1.Shot.create({ latitude: latitude, longitude: longitude })];
                    case 3:
                        shot = _a.sent();
                        return [2 /*return*/, utilities_1.didShotHit(latitude, longitude, ships)];
                }
            });
        });
    };
    ShotRepository.prototype.reset = function () {
        return database_1.Shot.deleteMany({});
    };
    return ShotRepository;
}());
exports.ShotRepository = ShotRepository;
//# sourceMappingURL=repositories.js.map