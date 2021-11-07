import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getDialogActionsUtilityClass(slot) {
  return generateUtilityClass('MuiDialogActions', slot);
}
const dialogActionsClasses = generateUtilityClasses('MuiDialogActions', ['root', 'spacing']);
export default dialogActionsClasses;