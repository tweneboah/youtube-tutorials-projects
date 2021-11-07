import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getAccordionDetailsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionDetails', slot);
}
var accordionDetailsClasses = generateUtilityClasses('MuiAccordionDetails', ['root']);
export default accordionDetailsClasses;