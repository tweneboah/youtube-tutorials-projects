import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getCardActionAreaUtilityClass(slot) {
  return generateUtilityClass('MuiCardActionArea', slot);
}
const cardActionAreaClasses = generateUtilityClasses('MuiCardActionArea', ['root', 'focusVisible', 'focusHighlight']);
export default cardActionAreaClasses;