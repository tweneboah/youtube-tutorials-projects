import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getListItemTextUtilityClass(slot) {
  return generateUtilityClass('MuiListItemText', slot);
}
var listItemTextClasses = generateUtilityClasses('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']);
export default listItemTextClasses;