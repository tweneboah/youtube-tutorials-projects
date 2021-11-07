import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getPaginationUtilityClass(slot) {
  return generateUtilityClass('MuiPagination', slot);
}
const paginationClasses = generateUtilityClasses('MuiPagination', ['root', 'ul', 'outlined', 'text']);
export default paginationClasses;