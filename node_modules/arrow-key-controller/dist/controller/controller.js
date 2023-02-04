"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false
        };
    }
    Object.defineProperty(Controller.prototype, "up", {
        get: function () {
            return this.keys.ArrowUp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "down", {
        get: function () {
            return this.keys.ArrowDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "right", {
        get: function () {
            return this.keys.ArrowRight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "left", {
        get: function () {
            return this.keys.ArrowLeft;
        },
        enumerable: true,
        configurable: true
    });
    Controller.prototype.init = function () {
        var _this = this;
        document.addEventListener('keydown', function (e) { return _this.onKeyDown(e); });
        document.addEventListener('keyup', function (e) { return _this.onKeyUp(e); });
    };
    Controller.prototype.onKeyDown = function (event) {
        this.keys[event.key] = true;
    };
    Controller.prototype.onKeyUp = function (event) {
        this.keys[event.key] = false;
    };
    return Controller;
}());
exports.Controller = Controller;
