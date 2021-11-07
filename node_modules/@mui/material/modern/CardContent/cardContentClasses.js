import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getCardContentUtilityClass(slot) {
  return generateUtilityClass('MuiCardContent', slot);
}
const cardContentClasses = generateUtilityClasses('MuiCardContent', ['root']);
export default cardContentClasses;