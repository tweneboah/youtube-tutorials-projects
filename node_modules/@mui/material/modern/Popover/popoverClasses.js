import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getPopoverUtilityClass(slot) {
  return generateUtilityClass('MuiPopover', slot);
}
const popoverClasses = generateUtilityClasses('MuiPopover', ['root', 'paper']);
export default popoverClasses;