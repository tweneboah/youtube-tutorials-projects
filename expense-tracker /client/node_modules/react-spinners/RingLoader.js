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
var right = react_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}\n  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}\n"], ["\n  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}\n  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}\n"])));
var left = react_1.keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}\n  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}\n"], ["\n  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}\n  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}\n"])));
var Loader = /** @class */ (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getSize = function () {
            return _this.props.size;
        };
        _this.style = function (i) {
            var _a = _this.props, color = _a.color, speedMultiplier = _a.speedMultiplier;
            var _b = helpers_1.parseLengthAndUnit(_this.getSize()), value = _b.value, unit = _b.unit;
            return react_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: ", ";\n      height: ", ";\n      border: ", " solid ", ";\n      opacity: 0.4;\n      border-radius: 100%;\n      animation-fill-mode: forwards;\n      perspective: 800px;\n      animation: ", " ", "s 0s infinite linear;\n    "], ["\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: ", ";\n      height: ", ";\n      border: ", " solid ", ";\n      opacity: 0.4;\n      border-radius: 100%;\n      animation-fill-mode: forwards;\n      perspective: 800px;\n      animation: ", " ", "s 0s infinite linear;\n    "])), "" + value + unit, "" + value + unit, "" + value / 10 + unit, color, i === 1 ? right : left, 2 / speedMultiplier);
        };
        _this.wrapper = function () {
            return react_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      width: ", ";\n      height: ", ";\n      position: relative;\n    "], ["\n      width: ", ";\n      height: ", ";\n      position: relative;\n    "])), helpers_1.cssValue(_this.getSize()), helpers_1.cssValue(_this.getSize()));
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (react_1.jsx("span", { css: [this.wrapper(), css] },
            react_1.jsx("span", { css: this.style(1) }),
            react_1.jsx("span", { css: this.style(2) }))) : null;
    };
    Loader.defaultProps = helpers_1.sizeDefaults(60);
    return Loader;
}(React.PureComponent));
exports.default = Loader;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
