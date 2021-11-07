import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const DEFAULT_STORAGE_KEY = 'mui-color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-mui-color-scheme';
export default function getInitColorSchemeScript(options) {
  const {
    storageKey = DEFAULT_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE
  } = options || {};
  return /*#__PURE__*/_jsx("script", {
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