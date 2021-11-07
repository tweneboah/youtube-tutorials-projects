import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getDialogContentTextUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContentText', slot);
}
var dialogContentTextClasses = generateUtilityClasses('MuiDialogContentText', ['root']);
export default dialogContentTextClasses;