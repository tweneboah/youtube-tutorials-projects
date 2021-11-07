import { generateUtilityClasses, generateUtilityClass } from '@mui/core';
export function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass('MuiOutlinedInput', slot);
}
var outlinedInputClasses = generateUtilityClasses('MuiOutlinedInput', ['root', 'colorSecondary', 'focused', 'disabled', 'adornedStart', 'adornedEnd', 'error', 'sizeSmall', 'multiline', 'notchedOutline', 'input', 'inputSizeSmall', 'inputMultiline', 'inputAdornedStart', 'inputAdornedEnd']);
export default outlinedInputClasses;