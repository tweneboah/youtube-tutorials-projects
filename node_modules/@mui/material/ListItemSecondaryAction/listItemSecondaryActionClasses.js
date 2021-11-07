import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getListItemSecondaryActionClassesUtilityClass(slot) {
  return generateUtilityClass('MuiListItemSecondaryAction', slot);
}
const listItemSecondaryActionClasses = generateUtilityClasses('MuiListItemSecondaryAction', ['root', 'disableGutters']);
export default listItemSecondaryActionClasses;