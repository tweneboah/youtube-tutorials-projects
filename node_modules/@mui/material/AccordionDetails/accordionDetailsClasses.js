import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getAccordionDetailsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionDetails', slot);
}
const accordionDetailsClasses = generateUtilityClasses('MuiAccordionDetails', ['root']);
export default accordionDetailsClasses;