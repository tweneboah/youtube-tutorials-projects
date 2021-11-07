import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getImageListUtilityClass(slot) {
  return generateUtilityClass('MuiImageList', slot);
}
var imageListClasses = generateUtilityClasses('MuiImageList', ['root', 'masonry', 'quilted', 'standard', 'woven']);
export default imageListClasses;