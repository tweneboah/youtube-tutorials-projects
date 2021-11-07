import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getCardContentUtilityClass(slot) {
  return generateUtilityClass('MuiCardContent', slot);
}
var cardContentClasses = generateUtilityClasses('MuiCardContent', ['root']);
export default cardContentClasses;