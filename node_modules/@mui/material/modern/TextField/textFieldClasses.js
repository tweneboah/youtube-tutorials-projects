import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTextFieldUtilityClass(slot) {
  return generateUtilityClass('MuiTextField', slot);
}
const textFieldClasses = generateUtilityClasses('MuiTextField', ['root']);
export default textFieldClasses;