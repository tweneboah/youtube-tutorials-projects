"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCssVarsProvider;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _utils = require("@mui/utils");

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledEngine = require("@mui/styled-engine");

var _cssVarsParser = _interopRequireDefault(require("./cssVarsParser"));

var _getInitColorSchemeScript = _interopRequireWildcard(require("./getInitColorSchemeScript"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["colorSchemes"],
      _excluded2 = ["colorSchemes"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const resolveMode = (key, fallback, supportedColorSchemes) => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  let value;

  try {
    value = localStorage.getItem(key) || undefined;

    if (!supportedColorSchemes.includes(value)) {
      value = undefined;
    }
  } catch (e) {// Unsupported
  }

  return value || fallback;
};

function createCssVarsProvider(ThemeContext, options) {
  const {
    theme: baseTheme = {},
    defaultColorScheme: designSystemColorScheme,
    prefix: designSystemPrefix = ''
  } = options;

  if (!baseTheme.colorSchemes || !baseTheme.colorSchemes[designSystemColorScheme]) {
    console.error(`MUI: \`${designSystemColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
  }

  const ColorSchemeContext = /*#__PURE__*/React.createContext(undefined);

  const useColorScheme = () => {
    const value = React.useContext(ColorSchemeContext);

    if (!value) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: \`useColorScheme\` must be called under <CssVarsProvider />` : (0, _utils.formatMuiErrorMessage)(19));
    }

    return value;
  };

  function CssVarsProvider({
    children,
    theme: themeProp = {},
    prefix = designSystemPrefix,
    storageKey = _getInitColorSchemeScript.DEFAULT_STORAGE_KEY,
    attribute = _getInitColorSchemeScript.DEFAULT_ATTRIBUTE,
    defaultColorScheme = designSystemColorScheme
  }) {
    const {
      colorSchemes: baseColorSchemes = {}
    } = baseTheme,
          restBaseTheme = (0, _objectWithoutPropertiesLoose2.default)(baseTheme, _excluded);
    const {
      colorSchemes: colorSchemesProp = {}
    } = themeProp,
          restThemeProp = (0, _objectWithoutPropertiesLoose2.default)(themeProp, _excluded2);
    let mergedTheme = (0, _utils.deepmerge)(restBaseTheme, restThemeProp);
    const colorSchemes = (0, _utils.deepmerge)(baseColorSchemes, colorSchemesProp);
    const allColorSchemes = Object.keys(colorSchemes);
    const joinedColorSchemes = allColorSchemes.join(',');
    const [colorScheme, setColorScheme] = React.useState(() => resolveMode(storageKey, defaultColorScheme, allColorSchemes));
    const resolvedColorScheme = colorScheme || defaultColorScheme;
    const {
      css: rootCss,
      vars: rootVars
    } = (0, _cssVarsParser.default)(mergedTheme, {
      prefix
    });
    mergedTheme = (0, _extends2.default)({}, mergedTheme, colorSchemes[resolvedColorScheme], {
      vars: rootVars
    });
    const styleSheet = {};
    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const {
        css,
        vars
      } = (0, _cssVarsParser.default)(scheme, {
        prefix
      });

      if (key === resolvedColorScheme) {
        mergedTheme.vars = (0, _extends2.default)({}, mergedTheme.vars, vars);
      }

      if (key === defaultColorScheme) {
        styleSheet[':root'] = (0, _utils.deepmerge)(rootCss, css);
      } else {
        styleSheet[`[${attribute}="${key}"]`] = css;
      }
    });
    React.useEffect(() => {
      if (colorScheme) {
        document.body.setAttribute(attribute, colorScheme);
        localStorage.setItem(storageKey, colorScheme);
      }
    }, [colorScheme, attribute, storageKey]); // local storage modified in the context of another document

    React.useEffect(() => {
      const handleStorage = event => {
        const storageColorScheme = event.newValue;

        if (event.key === storageKey && joinedColorSchemes.match(storageColorScheme)) {
          if (storageColorScheme) {
            setColorScheme(storageColorScheme);
          }
        }
      };

      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }, [setColorScheme, storageKey, joinedColorSchemes]);
    const wrappedSetColorScheme = React.useCallback(val => {
      if (typeof val === 'string' && !allColorSchemes.includes(val)) {
        console.error(`\`${val}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setColorScheme(val);
      }
    }, [setColorScheme, allColorSchemes]);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ColorSchemeContext.Provider, {
      value: {
        colorScheme,
        setColorScheme: wrappedSetColorScheme,
        allColorSchemes
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_styledEngine.GlobalStyles, {
        styles: styleSheet
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ThemeContext.Provider, {
        value: mergedTheme,
        children: children
      })]
    });
  }

  process.env.NODE_ENV !== "production" ? CssVarsProvider.propTypes = {
    /**
     * The body attribute name to attach colorScheme.
     */
    attribute: _propTypes.default.string,

    /**
     * Your component tree.
     */
    children: _propTypes.default.node,

    /**
     * The initial color scheme used.
     */
    defaultColorScheme: _propTypes.default.string,

    /**
     * css variable prefix
     */
    prefix: _propTypes.default.string,

    /**
     * The key in the local storage used to store current color scheme.
     */
    storageKey: _propTypes.default.string,

    /**
     * The calculated theme object that will be passed through context.
     */
    theme: _propTypes.default.object
  } : void 0;
  return {
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript: _getInitColorSchemeScript.default
  };
}