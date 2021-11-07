import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getAvatarGroupUtilityClass(slot) {
  return generateUtilityClass('MuiAvatarGroup', slot);
}
const avatarGroupClasses = generateUtilityClasses('MuiAvatarGroup', ['root', 'avatar']);
export default avatarGroupClasses;