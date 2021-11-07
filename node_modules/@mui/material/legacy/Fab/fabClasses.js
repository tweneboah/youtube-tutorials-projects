import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getFabUtilityClass(slot) {
  return generateUtilityClass('MuiFab', slot);
}
var fabClasses = generateUtilityClasses('MuiFab', ['root', 'primary', 'secondary', 'extended', 'circular', 'focusVisible', 'disabled', 'colorInherit', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
export default fabClasses;