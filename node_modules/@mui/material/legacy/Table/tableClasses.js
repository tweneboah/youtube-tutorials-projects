import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTableUtilityClass(slot) {
  return generateUtilityClass('MuiTable', slot);
}
var tableClasses = generateUtilityClasses('MuiTable', ['root', 'stickyHeader']);
export default tableClasses;