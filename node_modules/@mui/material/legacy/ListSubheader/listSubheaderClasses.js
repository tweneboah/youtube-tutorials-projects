import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getListSubheaderUtilityClass(slot) {
  return generateUtilityClass('MuiListSubheader', slot);
}
var listSubheaderClasses = generateUtilityClasses('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
export default listSubheaderClasses;