"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heightWidthRadiusDefaults = exports.heightWidthDefaults = exports.sizeMarginDefaults = exports.sizeDefaults = void 0;
/*
 * DefaultProps object for different loaders
 */
var commonValues = {
    loading: true,
    color: "#000000",
    css: "",
    speedMultiplier: 1
};
function sizeDefaults(sizeValue) {
    return Object.assign({}, commonValues, { size: sizeValue });
}
exports.sizeDefaults = sizeDefaults;
function sizeMarginDefaults(sizeValue) {
    return Object.assign({}, sizeDefaults(sizeValue), {
        margin: 2
    });
}
exports.sizeMarginDefaults = sizeMarginDefaults;
function heightWidthDefaults(height, width) {
    return Object.assign({}, commonValues, {
        height: height,
        width: width
    });
}
exports.heightWidthDefaults = heightWidthDefaults;
function heightWidthRadiusDefaults(height, width, radius) {
    if (radius === void 0) { radius = 2; }
    return Object.assign({}, heightWidthDefaults(height, width), {
        radius: radius,
        margin: 2
    });
}
exports.heightWidthRadiusDefaults = heightWidthRadiusDefaults;
