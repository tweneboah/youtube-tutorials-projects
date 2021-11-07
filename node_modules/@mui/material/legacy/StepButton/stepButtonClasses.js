import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getStepButtonUtilityClass(slot) {
  return generateUtilityClass('MuiStepButton', slot);
}
var stepButtonClasses = generateUtilityClasses('MuiStepButton', ['root', 'horizontal', 'vertical', 'touchRipple']);
export default stepButtonClasses;