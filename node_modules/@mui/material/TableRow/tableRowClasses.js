import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTableRowUtilityClass(slot) {
  return generateUtilityClass('MuiTableRow', slot);
}
const tableRowClasses = generateUtilityClasses('MuiTableRow', ['root', 'selected', 'hover', 'head', 'footer']);
export default tableRowClasses;