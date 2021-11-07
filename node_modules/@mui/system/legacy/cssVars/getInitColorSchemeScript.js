import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var DEFAULT_STORAGE_KEY = 'mui-color-scheme';
export var DEFAULT_ATTRIBUTE = 'data-mui-color-scheme';
export default function getInitColorSchemeScript(options) {
  var _ref = options || {},
      _ref$storageKey = _ref.storageKey,
      storageKey = _ref$storageKey === void 0 ? DEFAULT_STORAGE_KEY : _ref$storageKey,
      _ref$attribute = _ref.attribute,
      attribute = _ref$attribute === void 0 ? DEFAULT_ATTRIBUTE : _ref$attribute;

  return /*#__PURE__*/_jsx("script", {
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML: {
      __html: "(function() { try {\n        var colorScheme = localStorage.getItem('".concat(storageKey, "');\n        if (colorScheme) {\n          document.body.setAttribute('").concat(attribute, "', colorScheme);\n        }\n      } catch (e) {} })();")
    }
  });
}