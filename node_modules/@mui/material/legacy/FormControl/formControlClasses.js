import { generateUtilityClasses, generateUtilityClass } from '@mui/core';
export function getFormControlUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControl', slot);
}
var formControlClasses = generateUtilityClasses('MuiFormControl', ['root', 'marginNone', 'marginNormal', 'marginDense', 'fullWidth', 'disabled']);
export default formControlClasses;