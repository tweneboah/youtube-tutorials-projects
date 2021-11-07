import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTableSortLabelUtilityClass(slot) {
  return generateUtilityClass('MuiTableSortLabel', slot);
}
var tableSortLabelClasses = generateUtilityClasses('MuiTableSortLabel', ['root', 'active', 'icon', 'iconDirectionDesc', 'iconDirectionAsc']);
export default tableSortLabelClasses;