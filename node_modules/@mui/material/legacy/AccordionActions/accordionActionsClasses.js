import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getAccordionActionsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionActions', slot);
}
var accordionActionsClasses = generateUtilityClasses('MuiAccordionActions', ['root', 'spacing']);
export default accordionActionsClasses;