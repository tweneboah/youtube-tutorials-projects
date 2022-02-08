"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var React = __importStar(require("react"));
var react_1 = require("@emotion/react");
var helpers_1 = require("./helpers");
var climbingBox = react_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% {transform:translate(0, -1em) rotate(-45deg)}\n  5% {transform:translate(0, -1em) rotate(-50deg)}\n  20% {transform:translate(1em, -2em) rotate(47deg)}\n  25% {transform:translate(1em, -2em) rotate(45deg)}\n  30% {transform:translate(1em, -2em) rotate(40deg)}\n  45% {transform:translate(2em, -3em) rotate(137deg)}\n  50% {transform:translate(2em, -3em) rotate(135deg)}\n  55% {transform:translate(2em, -3em) rotate(130deg)}\n  70% {transform:translate(3em, -4em) rotate(217deg)}\n  75% {transform:translate(3em, -4em) rotate(220deg)}\n  100% {transform:translate(0, -1em) rotate(-225deg)}\n"], ["\n  0% {transform:translate(0, -1em) rotate(-45deg)}\n  5% {transform:translate(0, -1em) rotate(-50deg)}\n  20% {transform:translate(1em, -2em) rotate(47deg)}\n  25% {transform:translate(1em, -2em) rotate(45deg)}\n  30% {transform:translate(1em, -2em) rotate(40deg)}\n  45% {transform:translate(2em, -3em) rotate(137deg)}\n  50% {transform:translate(2em, -3em) rotate(135deg)}\n  55% {transform:translate(2em, -3em) rotate(130deg)}\n  70% {transform:translate(3em, -4em) rotate(217deg)}\n  75% {transform:translate(3em, -4em) rotate(220deg)}\n  100% {transform:translate(0, -1em) rotate(-225deg)}\n"])));
var Loader = /** @class */ (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function () {
            var _a = _this.props, color = _a.color, speedMultiplier = _a.speedMultiplier;
            return react_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      position: absolute;\n      left: 0;\n      bottom: -0.1em;\n      height: 1em;\n      width: 1em;\n      background-color: transparent;\n      border-radius: 15%;\n      border: 0.25em solid ", ";\n      transform: translate(0, -1em) rotate(-45deg);\n      animation-fill-mode: both;\n      animation: ", " ", "s infinite cubic-bezier(0.79, 0, 0.47, 0.97);\n    "], ["\n      position: absolute;\n      left: 0;\n      bottom: -0.1em;\n      height: 1em;\n      width: 1em;\n      background-color: transparent;\n      border-radius: 15%;\n      border: 0.25em solid ", ";\n      transform: translate(0, -1em) rotate(-45deg);\n      animation-fill-mode: both;\n      animation: ", " ", "s infinite cubic-bezier(0.79, 0, 0.47, 0.97);\n    "])), color, climbingBox, 2.5 / speedMultiplier);
        };
        _this.wrapper = function () {
            var size = _this.props.size;
            return react_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      margin-top: -2.7em;\n      margin-left: -2.7em;\n      width: 5.4em;\n      height: 5.4em;\n      font-size: ", ";\n    "], ["\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      margin-top: -2.7em;\n      margin-left: -2.7em;\n      width: 5.4em;\n      height: 5.4em;\n      font-size: ", ";\n    "])), helpers_1.cssValue(size));
        };
        _this.hill = function () {
            var color = _this.props.color;
            return react_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      position: absolute;\n      width: 7.1em;\n      height: 7.1em;\n      top: 1.7em;\n      left: 1.7em;\n      border-left: 0.25em solid ", ";\n      transform: rotate(45deg);\n    "], ["\n      position: absolute;\n      width: 7.1em;\n      height: 7.1em;\n      top: 1.7em;\n      left: 1.7em;\n      border-left: 0.25em solid ", ";\n      transform: rotate(45deg);\n    "])), color);
        };
        _this.container = function () {
            return react_1.css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      position: relative;\n      width: 7.1em;\n      height: 7.1em;\n    "], ["\n      position: relative;\n      width: 7.1em;\n      height: 7.1em;\n    "])));
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (react_1.jsx("span", { css: [this.container(), css] },
            react_1.jsx("span", { css: this.wrapper() },
                react_1.jsx("span", { css: this.style() }),
                react_1.jsx("span", { css: this.hill() })))) : null;
    };
    Loader.defaultProps = helpers_1.sizeDefaults(15);
    return Loader;
}(React.PureComponent));
exports.default = Loader;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
