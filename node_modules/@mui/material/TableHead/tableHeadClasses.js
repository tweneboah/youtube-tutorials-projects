import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTableHeadUtilityClass(slot) {
  return generateUtilityClass('MuiTableHead', slot);
}
const tableHeadClasses = generateUtilityClasses('MuiTableHead', ['root']);
export default tableHeadClasses;