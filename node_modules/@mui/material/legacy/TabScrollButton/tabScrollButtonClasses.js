import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTabScrollButtonUtilityClass(slot) {
  return generateUtilityClass('MuiTabScrollButton', slot);
}
var tabScrollButtonClasses = generateUtilityClasses('MuiTabScrollButton', ['root', 'vertical', 'horizontal', 'disabled']);
export default tabScrollButtonClasses;