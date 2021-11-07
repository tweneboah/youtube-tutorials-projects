import * as React from 'react';
import { getThemeProps, useThemeWithoutDefault as useTheme } from '@mui/system';
import useEnhancedEffect from '../utils/useEnhancedEffect';
/**
 * @deprecated Not used internally. Use `MediaQueryListEvent` from lib.dom.d.ts instead.
 */

export default function useMediaQuery(queryInput) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var theme = useTheme(); // Wait for jsdom to support the match media feature.
  // All the browsers MUI support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.

  var supportMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  var _getThemeProps = getThemeProps({
    name: 'MuiUseMediaQuery',
    props: options,
    theme: theme
  }),
      _getThemeProps$defaul = _getThemeProps.defaultMatches,
      defaultMatches = _getThemeProps$defaul === void 0 ? false : _getThemeProps$defaul,
      _getThemeProps$matchM = _getThemeProps.matchMedia,
      matchMedia = _getThemeProps$matchM === void 0 ? supportMatchMedia ? window.matchMedia : null : _getThemeProps$matchM,
      _getThemeProps$noSsr = _getThemeProps.noSsr,
      noSsr = _getThemeProps$noSsr === void 0 ? false : _getThemeProps$noSsr,
      _getThemeProps$ssrMat = _getThemeProps.ssrMatchMedia,
      ssrMatchMedia = _getThemeProps$ssrMat === void 0 ? null : _getThemeProps$ssrMat;

  if (process.env.NODE_ENV !== 'production') {
    if (typeof queryInput === 'function' && theme === null) {
      console.error(['MUI: The `query` argument provided is invalid.', 'You are providing a function without a theme in the context.', 'One of the parent elements needs to use a ThemeProvider.'].join('\n'));
    }
  }

  var query = typeof queryInput === 'function' ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, '');

  var _React$useState = React.useState(function () {
    if (noSsr && supportMatchMedia) {
      return matchMedia(query).matches;
    }

    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    } // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.


    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches;
  }),
      match = _React$useState[0],
      setMatch = _React$useState[1];

  useEnhancedEffect(function () {
    var active = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    var queryList = matchMedia(query);

    var updateMatch = function updateMatch() {
      // Workaround Safari wrong implementation of matchMedia
      // TODO can we remove it?
      // https://github.com/mui-org/material-ui/pull/17315#issuecomment-528286677
      if (active) {
        setMatch(queryList.matches);
      }
    };

    updateMatch();
    queryList.addListener(updateMatch);
    return function () {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue({
      query: query,
      match: match
    });
  }

  return match;
}