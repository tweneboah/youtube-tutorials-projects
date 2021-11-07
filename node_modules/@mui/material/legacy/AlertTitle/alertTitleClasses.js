import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getAlertTitleUtilityClass(slot) {
  return generateUtilityClass('MuiAlertTitle', slot);
}
var alertTitleClasses = generateUtilityClasses('MuiAlertTitle', ['root']);
export default alertTitleClasses;