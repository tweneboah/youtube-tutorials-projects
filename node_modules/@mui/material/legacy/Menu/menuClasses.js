import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getMenuUtilityClass(slot) {
  return generateUtilityClass('MuiMenu', slot);
}
var menuClasses = generateUtilityClasses('MuiMenu', ['root', 'paper', 'list']);
export default menuClasses;