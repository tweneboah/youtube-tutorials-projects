import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getSnackbarUtilityClass(slot) {
  return generateUtilityClass('MuiSnackbar', slot);
}
var snackbarClasses = generateUtilityClasses('MuiSnackbar', ['root', 'anchorOriginTopCenter', 'anchorOriginBottomCenter', 'anchorOriginTopRight', 'anchorOriginBottomRight', 'anchorOriginTopLeft', 'anchorOriginBottomLeft']);
export default snackbarClasses;