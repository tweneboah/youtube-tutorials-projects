"use strict";
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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var index_1 = require("./helpers/index");
var Loader = /** @class */ (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.thickness = function () {
            var size = _this.props.size;
            var value = index_1.parseLengthAndUnit(size).value;
            return value / 5;
        };
        _this.lat = function () {
            var size = _this.props.size;
            var value = index_1.parseLengthAndUnit(size).value;
            return (value - _this.thickness()) / 2;
        };
        _this.offset = function () { return _this.lat() - _this.thickness(); };
        _this.color = function () {
            var color = _this.props.color;
            return index_1.calculateRgba(color, 0.75);
        };
        _this.before = function () {
            var size = _this.props.size;
            var color = _this.color();
            var lat = _this.lat();
            var thickness = _this.thickness();
            var offset = _this.offset();
            return react_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      0% {width: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      35% {width: ", ";box-shadow: 0 ", "px ", ", 0 ", "px ", "}\n      70% {width: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      100% {box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n    "], ["\n      0% {width: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      35% {width: ", ";box-shadow: 0 ", "px ", ", 0 ", "px ", "}\n      70% {width: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      100% {box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n    "])), thickness, lat, -offset, color, -lat, offset, color, index_1.cssValue(size), -offset, color, offset, color, thickness, -lat, -offset, color, lat, offset, color, lat, -offset, color, -lat, offset, color);
        };
        _this.after = function () {
            var size = _this.props.size;
            var color = _this.color();
            var lat = _this.lat();
            var thickness = _this.thickness();
            var offset = _this.offset();
            return react_1.keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      0% {height: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      35% {height: ", ";box-shadow: ", "px 0 ", ", ", "px 0 ", "}\n      70% {height: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      100% {box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n    "], ["\n      0% {height: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      35% {height: ", ";box-shadow: ", "px 0 ", ", ", "px 0 ", "}\n      70% {height: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      100% {box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n    "])), thickness, offset, lat, color, -offset, -lat, color, index_1.cssValue(size), offset, color, -offset, color, thickness, offset, -lat, color, -offset, lat, color, offset, lat, color, -offset, -lat, color);
        };
        _this.style = function (i) {
            var _a = _this.props, size = _a.size, speedMultiplier = _a.speedMultiplier;
            var _b = index_1.parseLengthAndUnit(size), value = _b.value, unit = _b.unit;
            return react_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: absolute;\n      content: \"\";\n      top: 50%;\n      left: 50%;\n      display: block;\n      width: ", ";\n      height: ", ";\n      border-radius: ", ";\n      transform: translate(-50%, -50%);\n      animation-fill-mode: none;\n      animation: ", " ", "s infinite;\n    "], ["\n      position: absolute;\n      content: \"\";\n      top: 50%;\n      left: 50%;\n      display: block;\n      width: ", ";\n      height: ", ";\n      border-radius: ", ";\n      transform: translate(-50%, -50%);\n      animation-fill-mode: none;\n      animation: ", " ", "s infinite;\n    "])), "" + value / 5 + unit, "" + value / 5 + unit, "" + value / 10 + unit, i === 1 ? _this.before() : _this.after(), 2 / speedMultiplier);
        };
        _this.wrapper = function () {
            var size = _this.props.size;
            return react_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      transform: rotate(165deg);\n    "], ["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      transform: rotate(165deg);\n    "])), index_1.cssValue(size), index_1.cssValue(size));
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (react_1.jsx("span", { css: [this.wrapper(), css] },
            react_1.jsx("span", { css: this.style(1) }),
            react_1.jsx("span", { css: this.style(2) }))) : null;
    };
    Loader.defaultProps = index_1.sizeDefaults(50);
    return Loader;
}(React.PureComponent));
exports.default = Loader;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
