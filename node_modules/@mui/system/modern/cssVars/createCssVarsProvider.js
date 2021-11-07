import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { formatMuiErrorMessage as _formatMuiErrorMessage } from "@mui/utils";
const _excluded = ["colorSchemes"],
      _excluded2 = ["colorSchemes"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles } from '@mui/styled-engine';
import { deepmerge } from '@mui/utils';
import cssVarsParser from './cssVarsParser';
import getInitColorSchemeScript, { DEFAULT_ATTRIBUTE, DEFAULT_STORAGE_KEY } from './getInitColorSchemeScript';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

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

export default function createCssVarsProvider(ThemeContext, options) {
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
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: \`useColorScheme\` must be called under <CssVarsProvider />` : _formatMuiErrorMessage(19));
    }

    return value;
  };

  function CssVarsProvider({
    children,
    theme: themeProp = {},
    prefix = designSystemPrefix,
    storageKey = DEFAULT_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    defaultColorScheme = designSystemColorScheme
  }) {
    const {
      colorSchemes: baseColorSchemes = {}
    } = baseTheme,
          restBaseTheme = _objectWithoutPropertiesLoose(baseTheme, _excluded);

    const {
      colorSchemes: colorSchemesProp = {}
    } = themeProp,
          restThemeProp = _objectWithoutPropertiesLoose(themeProp, _excluded2);

    let mergedTheme = deepmerge(restBaseTheme, restThemeProp);
    const colorSchemes = deepmerge(baseColorSchemes, colorSchemesProp);
    const allColorSchemes = Object.keys(colorSchemes);
    const joinedColorSchemes = allColorSchemes.join(',');
    const [colorScheme, setColorScheme] = React.useState(() => resolveMode(storageKey, defaultColorScheme, allColorSchemes));
    const resolvedColorScheme = colorScheme || defaultColorScheme;
    const {
      css: rootCss,
      vars: rootVars
    } = cssVarsParser(mergedTheme, {
      prefix
    });
    mergedTheme = _extends({}, mergedTheme, colorSchemes[resolvedColorScheme], {
      vars: rootVars
    });
    const styleSheet = {};
    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      const {
        css,
        vars
      } = cssVarsParser(scheme, {
        prefix
      });

      if (key === resolvedColorScheme) {
        mergedTheme.vars = _extends({}, mergedTheme.vars, vars);
      }

      if (key === defaultColorScheme) {
        styleSheet[':root'] = deepmerge(rootCss, css);
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
    return /*#__PURE__*/_jsxs(ColorSchemeContext.Provider, {
      value: {
        colorScheme,
        setColorScheme: wrappedSetColorScheme,
        allColorSchemes
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
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript
  };
}