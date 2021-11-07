import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getDialogContentUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContent', slot);
}
const dialogContentClasses = generateUtilityClasses('MuiDialogContent', ['root', 'dividers']);
export default dialogContentClasses;