import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getIconButtonUtilityClass(slot) {
  return generateUtilityClass('MuiIconButton', slot);
}
var iconButtonClasses = generateUtilityClasses('MuiIconButton', ['root', 'disabled', 'colorInherit', 'colorPrimary', 'colorSecondary', 'edgeStart', 'edgeEnd', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
export default iconButtonClasses;