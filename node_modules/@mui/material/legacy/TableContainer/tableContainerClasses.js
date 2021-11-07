import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTableContainerUtilityClass(slot) {
  return generateUtilityClass('MuiTableContainer', slot);
}
var tableContainerClasses = generateUtilityClasses('MuiTableContainer', ['root']);
export default tableContainerClasses;