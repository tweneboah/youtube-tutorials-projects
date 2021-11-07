import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getSpeedDialActionUtilityClass(slot) {
  return generateUtilityClass('MuiSpeedDialAction', slot);
}
var speedDialActionClasses = generateUtilityClasses('MuiSpeedDialAction', ['fab', 'fabClosed', 'staticTooltip', 'staticTooltipClosed', 'staticTooltipLabel', 'tooltipPlacementLeft', 'tooltipPlacementRight']);
export default speedDialActionClasses;