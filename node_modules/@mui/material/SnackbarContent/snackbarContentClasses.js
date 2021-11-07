import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getSnackbarContentUtilityClass(slot) {
  return generateUtilityClass('MuiSnackbarContent', slot);
}
const snackbarContentClasses = generateUtilityClasses('MuiSnackbarContent', ['root', 'message', 'action']);
export default snackbarContentClasses;