import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTableContainerUtilityClass(slot) {
  return generateUtilityClass('MuiTableContainer', slot);
}
const tableContainerClasses = generateUtilityClasses('MuiTableContainer', ['root']);
export default tableContainerClasses;