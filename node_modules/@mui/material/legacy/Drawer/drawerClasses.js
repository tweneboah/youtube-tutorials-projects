import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getDrawerUtilityClass(slot) {
  return generateUtilityClass('MuiDrawer', slot);
}
var drawerClasses = generateUtilityClasses('MuiDrawer', ['root', 'docked', 'paper', 'paperAnchorLeft', 'paperAnchorRight', 'paperAnchorTop', 'paperAnchorBottom', 'paperAnchorDockedLeft', 'paperAnchorDockedRight', 'paperAnchorDockedTop', 'paperAnchorDockedBottom', 'modal']);
export default drawerClasses;