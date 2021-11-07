"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_STORAGE_KEY = exports.DEFAULT_ATTRIBUTE = void 0;
exports.default = getInitColorSchemeScript;

var React = _interopRequireWildcard(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DEFAULT_STORAGE_KEY = 'mui-color-scheme';
exports.DEFAULT_STORAGE_KEY = DEFAULT_STORAGE_KEY;
const DEFAULT_ATTRIBUTE = 'data-mui-color-scheme';
exports.DEFAULT_ATTRIBUTE = DEFAULT_ATTRIBUTE;

function getInitColorSchemeScript(options) {
  const {
    storageKey = DEFAULT_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE
  } = options || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("script", {
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML: {
      __html: `(function() { try {
        var colorScheme = localStorage.getItem('${storageKey}');
        if (colorScheme) {
          document.body.setAttribute('${attribute}', colorScheme);
        }
      } catch (e) {} })();`
    }
  });
}