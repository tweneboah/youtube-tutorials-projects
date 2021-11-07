import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getListItemAvatarUtilityClass(slot) {
  return generateUtilityClass('MuiListItemAvatar', slot);
}
const listItemAvatarClasses = generateUtilityClasses('MuiListItemAvatar', ['root', 'alignItemsFlexStart']);
export default listItemAvatarClasses;