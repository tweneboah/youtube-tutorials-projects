import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getHiddenCssUtilityClass(slot) {
  return generateUtilityClass('PrivateHiddenCss', slot);
}
var hiddenCssClasses = generateUtilityClasses('PrivateHiddenCss', ['root', 'xlDown', 'xlUp', 'onlyXl', 'lgDown', 'lgUp', 'onlyLg', 'mdDown', 'mdUp', 'onlyMd', 'smDown', 'smUp', 'onlySm', 'xsDown', 'xsUp', 'onlyXs']);
export default hiddenCssClasses;