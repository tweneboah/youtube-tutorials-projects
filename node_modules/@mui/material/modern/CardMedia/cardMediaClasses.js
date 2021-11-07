import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getCardMediaUtilityClass(slot) {
  return generateUtilityClass('MuiCardMedia', slot);
}
const cardMediaClasses = generateUtilityClasses('MuiCardMedia', ['root', 'media', 'img']);
export default cardMediaClasses;