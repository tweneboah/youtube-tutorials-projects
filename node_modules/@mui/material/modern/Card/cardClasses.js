import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getCardUtilityClass(slot) {
  return generateUtilityClass('MuiCard', slot);
}
const cardClasses = generateUtilityClasses('MuiCard', ['root']);
export default cardClasses;