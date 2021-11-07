import { generateUtilityClasses, generateUtilityClass } from '@mui/core';
export function getFilledInputUtilityClass(slot) {
  return generateUtilityClass('MuiFilledInput', slot);
}
const filledInputClasses = generateUtilityClasses('MuiFilledInput', ['root', 'colorSecondary', 'underline', 'focused', 'disabled', 'adornedStart', 'adornedEnd', 'error', 'sizeSmall', 'multiline', 'hiddenLabel', 'input', 'inputSizeSmall', 'inputHiddenLabel', 'inputMultiline', 'inputAdornedStart', 'inputAdornedEnd']);
export default filledInputClasses;