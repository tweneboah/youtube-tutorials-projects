import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getSpeedDialIconUtilityClass(slot) {
  return generateUtilityClass('MuiSpeedDialIcon', slot);
}
var speedDialIconClasses = generateUtilityClasses('MuiSpeedDialIcon', ['root', 'icon', 'iconOpen', 'iconWithOpenIconOpen', 'openIcon', 'openIconOpen']);
export default speedDialIconClasses;