import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTableBodyUtilityClass(slot) {
  return generateUtilityClass('MuiTableBody', slot);
}
const tableBodyClasses = generateUtilityClasses('MuiTableBody', ['root']);
export default tableBodyClasses;