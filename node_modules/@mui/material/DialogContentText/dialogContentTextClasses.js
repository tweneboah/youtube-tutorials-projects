import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getDialogContentTextUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContentText', slot);
}
const dialogContentTextClasses = generateUtilityClasses('MuiDialogContentText', ['root']);
export default dialogContentTextClasses;