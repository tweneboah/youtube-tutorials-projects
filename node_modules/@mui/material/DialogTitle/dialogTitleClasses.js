import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getDialogTitleUtilityClass(slot) {
  return generateUtilityClass('MuiDialogTitle', slot);
}
const dialogTitleClasses = generateUtilityClasses('MuiDialogTitle', ['root']);
export default dialogTitleClasses;