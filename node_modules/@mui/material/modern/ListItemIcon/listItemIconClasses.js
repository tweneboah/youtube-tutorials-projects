import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getListItemIconUtilityClass(slot) {
  return generateUtilityClass('MuiListItemIcon', slot);
}
const listItemIconClasses = generateUtilityClasses('MuiListItemIcon', ['root', 'alignItemsFlexStart']);
export default listItemIconClasses;