import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTableFooterUtilityClass(slot) {
  return generateUtilityClass('MuiTableFooter', slot);
}
const tableFooterClasses = generateUtilityClasses('MuiTableFooter', ['root']);
export default tableFooterClasses;