import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getListItemIconUtilityClass(slot) {
  return generateUtilityClass('MuiListItemIcon', slot);
}
var listItemIconClasses = generateUtilityClasses('MuiListItemIcon', ['root', 'alignItemsFlexStart']);
export default listItemIconClasses;