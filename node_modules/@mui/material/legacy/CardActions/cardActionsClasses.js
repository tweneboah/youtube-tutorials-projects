import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getCardActionsUtilityClass(slot) {
  return generateUtilityClass('MuiCardActions', slot);
}
var cardActionsClasses = generateUtilityClasses('MuiCardActions', ['root', 'spacing']);
export default cardActionsClasses;