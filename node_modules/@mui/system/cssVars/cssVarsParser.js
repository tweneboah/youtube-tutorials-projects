"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignNestedKeys = void 0;
exports.default = cssVarsParser;
exports.walkObjectDeep = void 0;

/**
 * This function create an object from keys, value and then assign to target
 *
 * @param {Object} obj : the target object to be assigned
 * @param {string[]} keys
 * @param {string | number} value
 *
 * @example
 * const source = {}
 * assignNestedKeys(source, ['palette', 'primary'], 'var(--palette-primary)')
 * console.log(source) // { palette: { primary: 'var(--palette-primary)' } }
 *
 * @example
 * const source = { palette: { primary: 'var(--palette-primary)' } }
 * assignNestedKeys(source, ['palette', 'secondary'], 'var(--palette-secondary)')
 * console.log(source) // { palette: { primary: 'var(--palette-primary)', secondary: 'var(--palette-secondary)' } }
 */
const assignNestedKeys = (obj, keys, value) => {
  let temp = obj;
  keys.forEach((k, index) => {
    if (index === keys.length - 1) {
      if (temp && typeof temp === 'object') {
        temp[k] = value;
      }
    } else if (temp && typeof temp === 'object') {
      if (!temp[k]) {
        temp[k] = {};
      }

      temp = temp[k];
    }
  });
};
/**
 *
 * @param {Object} obj : source object
 * @param {Function} callback : a function that will be called when
 *                   - the deepest key in source object is reached
 *                   - the value of the deepest key is NOT `undefined` | `null`
 *
 * @example
 * walkObjectDeep({ palette: { primary: { main: '#000000' } } }, console.log)
 * // ['palette', 'primary', 'main'] '#000000'
 */


exports.assignNestedKeys = assignNestedKeys;

const walkObjectDeep = (obj, callback) => {
  function recurse(object, parentKeys = []) {
    Object.entries(object).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && Object.keys(value).length > 0) {
          recurse(value, [...parentKeys, key]);
        } else {
          callback([...parentKeys, key], value);
        }
      }
    });
  }

  recurse(obj);
};

exports.walkObjectDeep = walkObjectDeep;

const getCssValue = (keys, value) => {
  if (typeof value === 'number') {
    if (['lineHeight', 'fontWeight', 'opacity', 'zIndex'].some(prop => keys.includes(prop))) {
      // css property that are unitless
      return value;
    }

    return `${value}px`;
  }

  return value;
};
/**
 * a function that parse theme and return { css, vars }
 *
 * @param {Object} theme
 * @param {{ prefix?: string }} options
 * @returns {{ css: Object, vars: Object }} `css` is the stylesheet, `vars` is an object to get css variable (same structure as theme)
 *
 * @example
 * const { css, vars } = parser({
 *   fontSize: 12,
 *   lineHeight: 1.2,
 *   palette: { primary: { 500: '#000000' } }
 * })
 *
 * console.log(css) // { '--fontSize': '12px', '--lineHeight': 1.2, '--palette-primary-500': '#000000' }
 * console.log(vars) // { fontSize: '--fontSize', lineHeight: '--lineHeight', palette: { primary: { 500: 'var(--palette-primary-500)' } } }
 */


function cssVarsParser(obj, options) {
  const {
    prefix
  } = options || {};
  const css = {};
  const vars = {};
  walkObjectDeep(obj, (keys, value) => {
    if (typeof value === 'string' || typeof value === 'number') {
      const cssVar = `--${prefix ? `${prefix}-` : ''}${keys.join('-')}`;
      Object.assign(css, {
        [cssVar]: getCssValue(keys, value)
      });
      assignNestedKeys(vars, keys, `var(${cssVar})`);
    }
  });
  return {
    css,
    vars
  };
}