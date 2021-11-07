import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getCardMediaUtilityClass(slot) {
  return generateUtilityClass('MuiCardMedia', slot);
}
var cardMediaClasses = generateUtilityClasses('MuiCardMedia', ['root', 'media', 'img']);
export default cardMediaClasses;