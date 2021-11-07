import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getBottomNavigationUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigation', slot);
}
const bottomNavigationClasses = generateUtilityClasses('MuiBottomNavigation', ['root']);
export default bottomNavigationClasses;