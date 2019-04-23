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
var repositories_1 = require("./repositories");
var utilities_1 = require("./utilities");
var AuthorizationError_1 = __importDefault(require("./AuthorizationError"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/attack/:latitude/:longitude', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, latitude, longitude, isHit, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, latitude = _a.latitude, longitude = _a.longitude;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, repositories_1.ShotRepository.instance().create(latitude, longitude)];
                case 2:
                    isHit = _b.sent();
                    if (isHit === true) {
                        res.send('HIT');
                    }
                    else {
                        res.send('MISS');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    if (err_1 instanceof AuthorizationError_1.default) {
                        res.status(401);
                    }
                    else {
                        res.status(400);
                    }
                    res.send('Failed to place shot: ' + err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.get('/ship/:latitude/:longitude/:type/:orientation', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, latitude, longitude, type, orientation, result, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, latitude = _a.latitude, longitude = _a.longitude, type = _a.type, orientation = _a.orientation;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, repositories_1.ShipRepository.instance().create(latitude, longitude, type, orientation)];
                case 2:
                    result = _b.sent();
                    res.send('Placed ' + type);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    if (err_2 instanceof AuthorizationError_1.default) {
                        res.status(401);
                    }
                    else {
                        res.status(400);
                    }
                    res.send('Failed to place ship: ' + err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.get('/reset', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories_1.ShipRepository.instance().reset()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, repositories_1.ShotRepository.instance().reset()];
                case 2:
                    _a.sent();
                    res.send('reset successfully');
                    return [2 /*return*/];
            }
        });
    });
});
app.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var ships, shipString, _i, ships_1, ship, shots, shotString, _a, shots_1, shot, isHit, grid, _b, ships_2, ship, length, i, _c, shots_2, shot, rows, i, row, j, color, map;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, repositories_1.ShipRepository.instance().get()];
                case 1:
                    ships = (_d.sent());
                    shipString = '';
                    for (_i = 0, ships_1 = ships; _i < ships_1.length; _i++) {
                        ship = ships_1[_i];
                        shipString += "<li>[" + ship.latitude + "," + ship.longitude + "]: " + ship.type + " (" + ship.orientation + ")</li>";
                    }
                    shipString = "<h3>Ships:</h3><ul>" + shipString + "</ul>";
                    return [4 /*yield*/, repositories_1.ShotRepository.instance().get()];
                case 2:
                    shots = (_d.sent());
                    shotString = '';
                    for (_a = 0, shots_1 = shots; _a < shots_1.length; _a++) {
                        shot = shots_1[_a];
                        isHit = utilities_1.didShotHit(shot.latitude, shot.longitude, ships);
                        shotString += "<li>[" + shot.latitude + "," + shot.longitude + "]: " + (isHit ? 'HIT' : 'MISS') + "</li>";
                    }
                    shotString = "<h3>Shots:</h3><ul>" + shotString + "</ul>";
                    grid = new Array(10).fill(0).map(function () { return new Array(10).fill(0); });
                    for (_b = 0, ships_2 = ships; _b < ships_2.length; _b++) {
                        ship = ships_2[_b];
                        length = utilities_1.getShipLengthFromType(ship.type);
                        for (i = 0; i < length; i++) {
                            if (ship.orientation === 'vertical') {
                                grid[ship.latitude + i][ship.longitude] = 1;
                            }
                            else {
                                grid[ship.latitude][ship.longitude + i] = 1;
                            }
                        }
                    }
                    for (_c = 0, shots_2 = shots; _c < shots_2.length; _c++) {
                        shot = shots_2[_c];
                        if (utilities_1.didShotHit(shot.latitude, shot.longitude, ships)) {
                            grid[shot.latitude][shot.longitude] = 3;
                        }
                        else {
                            grid[shot.latitude][shot.longitude] = 2;
                        }
                    }
                    rows = '';
                    for (i = 0; i < 10; i++) {
                        row = '';
                        for (j = 0; j < 10; j++) {
                            color = getColorFromNumber(grid[i][j]);
                            row += "<td width=30 height=30 style=\"color:black; border:solid; border-width:1; background-color:" + color + "\"></td>";
                        }
                        rows = "<tr>" + row + "</tr>" + rows; //Note these are added in reverse order to ensure latitude points north
                    }
                    map = "<table style=\"border:solid;\">" + rows + "</table>";
                    res.send(map + shipString + shotString);
                    return [2 /*return*/];
            }
        });
    });
});
var getColorFromNumber = function (number) {
    switch (number) {
        case 0:
            return 'white';
        case 1:
            return 'black';
        case 2:
            return 'green';
        case 3:
            return 'red';
        default:
            throw new Error('Unknown color type:' + number);
    }
};
app.listen(4000);
//# sourceMappingURL=index.js.map