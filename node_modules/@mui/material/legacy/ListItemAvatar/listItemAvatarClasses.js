import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getListItemAvatarUtilityClass(slot) {
  return generateUtilityClass('MuiListItemAvatar', slot);
}
var listItemAvatarClasses = generateUtilityClasses('MuiListItemAvatar', ['root', 'alignItemsFlexStart']);
export default listItemAvatarClasses;