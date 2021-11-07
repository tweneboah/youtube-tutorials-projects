import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getScopedCssBaselineUtilityClass(slot) {
  return generateUtilityClass('MuiScopedCssBaseline', slot);
}
var scopedCssBaselineClasses = generateUtilityClasses('MuiScopedCssBaseline', ['root']);
export default scopedCssBaselineClasses;