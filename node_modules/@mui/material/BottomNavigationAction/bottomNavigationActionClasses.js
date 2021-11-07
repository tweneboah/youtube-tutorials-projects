import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getBottomNavigationActionUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigationAction', slot);
}
const bottomNavigationActionClasses = generateUtilityClasses('MuiBottomNavigationAction', ['root', 'iconOnly', 'selected', 'label']);
export default bottomNavigationActionClasses;