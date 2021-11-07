import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass('MuiButtonBase', slot);
}
var buttonBaseClasses = generateUtilityClasses('MuiButtonBase', ['root', 'disabled', 'focusVisible']);
export default buttonBaseClasses;