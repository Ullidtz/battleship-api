"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// --/ <reference path='function-name.d.ts'/>
var AuthorizationError = /** @class */ (function (_super) {
    __extends(AuthorizationError, _super);
    function AuthorizationError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return AuthorizationError;
}(Error));
exports.default = AuthorizationError;
//# sourceMappingURL=AuthorizationError.js.map