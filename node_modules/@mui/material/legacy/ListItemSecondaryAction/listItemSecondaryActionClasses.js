import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getListItemSecondaryActionClassesUtilityClass(slot) {
  return generateUtilityClass('MuiListItemSecondaryAction', slot);
}
var listItemSecondaryActionClasses = generateUtilityClasses('MuiListItemSecondaryAction', ['root', 'disableGutters']);
export default listItemSecondaryActionClasses;