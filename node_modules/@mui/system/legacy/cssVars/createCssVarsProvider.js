import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { formatMuiErrorMessage as _formatMuiErrorMessage } from "@mui/utils";
import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles } from '@mui/styled-engine';
import { deepmerge } from '@mui/utils';
import cssVarsParser from './cssVarsParser';
import getInitColorSchemeScript, { DEFAULT_ATTRIBUTE, DEFAULT_STORAGE_KEY } from './getInitColorSchemeScript';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var resolveMode = function resolveMode(key, fallback, supportedColorSchemes) {
  if (typeof window === 'undefined') {
    return undefined;
  }

  var value;

  try {
    value = localStorage.getItem(key) || undefined;

    if (!supportedColorSchemes.includes(value)) {
      value = undefined;
    }
  } catch (e) {// Unsupported
  }

  return value || fallback;
};

export default function createCssVarsProvider(ThemeContext, options) {
  var _options$theme = options.theme,
      baseTheme = _options$theme === void 0 ? {} : _options$theme,
      designSystemColorScheme = options.defaultColorScheme,
      _options$prefix = options.prefix,
      designSystemPrefix = _options$prefix === void 0 ? '' : _options$prefix;

  if (!baseTheme.colorSchemes || !baseTheme.colorSchemes[designSystemColorScheme]) {
    console.error("MUI: `".concat(designSystemColorScheme, "` does not exist in `theme.colorSchemes`."));
  }

  var ColorSchemeContext = /*#__PURE__*/React.createContext(undefined);

  var useColorScheme = function useColorScheme() {
    var value = React.useContext(ColorSchemeContext);

    if (!value) {
      throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `useColorScheme` must be called under <CssVarsProvider />" : _formatMuiErrorMessage(19));
    }

    return value;
  };

  function CssVarsProvider(_ref) {
    var children = _ref.children,
        _ref$theme = _ref.theme,
        themeProp = _ref$theme === void 0 ? {} : _ref$theme,
        _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === void 0 ? designSystemPrefix : _ref$prefix,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === void 0 ? DEFAULT_STORAGE_KEY : _ref$storageKey,
        _ref$attribute = _ref.attribute,
        attribute = _ref$attribute === void 0 ? DEFAULT_ATTRIBUTE : _ref$attribute,
        _ref$defaultColorSche = _ref.defaultColorScheme,
        defaultColorScheme = _ref$defaultColorSche === void 0 ? designSystemColorScheme : _ref$defaultColorSche;

    var _baseTheme$colorSchem = baseTheme.colorSchemes,
        baseColorSchemes = _baseTheme$colorSchem === void 0 ? {} : _baseTheme$colorSchem,
        restBaseTheme = _objectWithoutProperties(baseTheme, ["colorSchemes"]);

    var _themeProp$colorSchem = themeProp.colorSchemes,
        colorSchemesProp = _themeProp$colorSchem === void 0 ? {} : _themeProp$colorSchem,
        restThemeProp = _objectWithoutProperties(themeProp, ["colorSchemes"]);

    var mergedTheme = deepmerge(restBaseTheme, restThemeProp);
    var colorSchemes = deepmerge(baseColorSchemes, colorSchemesProp);
    var allColorSchemes = Object.keys(colorSchemes);
    var joinedColorSchemes = allColorSchemes.join(',');

    var _React$useState = React.useState(function () {
      return resolveMode(storageKey, defaultColorScheme, allColorSchemes);
    }),
        colorScheme = _React$useState[0],
        setColorScheme = _React$useState[1];

    var resolvedColorScheme = colorScheme || defaultColorScheme;

    var _cssVarsParser = cssVarsParser(mergedTheme, {
      prefix: prefix
    }),
        rootCss = _cssVarsParser.css,
        rootVars = _cssVarsParser.vars;

    mergedTheme = _extends({}, mergedTheme, colorSchemes[resolvedColorScheme], {
      vars: rootVars
    });
    var styleSheet = {};
    Object.entries(colorSchemes).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          scheme = _ref3[1];

      var _cssVarsParser2 = cssVarsParser(scheme, {
        prefix: prefix
      }),
          css = _cssVarsParser2.css,
          vars = _cssVarsParser2.vars;

      if (key === resolvedColorScheme) {
        mergedTheme.vars = _extends({}, mergedTheme.vars, vars);
      }

      if (key === defaultColorScheme) {
        styleSheet[':root'] = deepmerge(rootCss, css);
      } else {
        styleSheet["[".concat(attribute, "=\"").concat(key, "\"]")] = css;
      }
    });
    React.useEffect(function () {
      if (colorScheme) {
        document.body.setAttribute(attribute, colorScheme);
        localStorage.setItem(storageKey, colorScheme);
      }
    }, [colorScheme, attribute, storageKey]); // local storage modified in the context of another document

    React.useEffect(function () {
      var handleStorage = function handleStorage(event) {
        var storageColorScheme = event.newValue;

        if (event.key === storageKey && joinedColorSchemes.match(storageColorScheme)) {
          if (storageColorScheme) {
            setColorScheme(storageColorScheme);
          }
        }
      };

      window.addEventListener('storage', handleStorage);
      return function () {
        return window.removeEventListener('storage', handleStorage);
      };
    }, [setColorScheme, storageKey, joinedColorSchemes]);
    var wrappedSetColorScheme = React.useCallback(function (val) {
      if (typeof val === 'string' && !allColorSchemes.includes(val)) {
        console.error("`".concat(val, "` does not exist in `theme.colorSchemes`."));
      } else {
        setColorScheme(val);
      }
    }, [setColorScheme, allColorSchemes]);
    return /*#__PURE__*/_jsxs(ColorSchemeContext.Provider, {
      value: {
        colorScheme: colorScheme,
        setColorScheme: wrappedSetColorScheme,
        allColorSchemes: allColorSchemes
      },
      children: [/*#__PURE__*/_jsx(GlobalStyles, {
        styles: styleSheet
      }), /*#__PURE__*/_jsx(ThemeContext.Provider, {
        value: mergedTheme,
        children: children
      })]
    });
  }

  process.env.NODE_ENV !== "production" ? CssVarsProvider.propTypes = {
    /**
     * The body attribute name to attach colorScheme.
     */
    attribute: PropTypes.string,

    /**
     * Your component tree.
     */
    children: PropTypes.node,

    /**
     * The initial color scheme used.
     */
    defaultColorScheme: PropTypes.string,

    /**
     * css variable prefix
     */
    prefix: PropTypes.string,

    /**
     * The key in the local storage used to store current color scheme.
     */
    storageKey: PropTypes.string,

    /**
     * The calculated theme object that will be passed through context.
     */
    theme: PropTypes.object
  } : void 0;
  return {
    CssVarsProvider: CssVarsProvider,
    useColorScheme: useColorScheme,
    getInitColorSchemeScript: getInitColorSchemeScript
  };
}