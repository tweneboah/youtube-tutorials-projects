import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getFormGroupUtilityClass(slot) {
  return generateUtilityClass('MuiFormGroup', slot);
}
var formGroupClasses = generateUtilityClasses('MuiFormGroup', ['root', 'row']);
export default formGroupClasses;