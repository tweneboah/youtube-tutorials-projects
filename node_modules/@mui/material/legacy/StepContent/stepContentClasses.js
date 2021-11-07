import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getStepContentUtilityClass(slot) {
  return generateUtilityClass('MuiStepContent', slot);
}
var stepContentClasses = generateUtilityClasses('MuiStepContent', ['root', 'last', 'transition']);
export default stepContentClasses;