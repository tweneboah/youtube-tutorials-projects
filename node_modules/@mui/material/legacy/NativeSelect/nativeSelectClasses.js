import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getNativeSelectUtilityClasses(slot) {
  return generateUtilityClass('MuiNativeSelect', slot);
}
var nativeSelectClasses = generateUtilityClasses('MuiNativeSelect', ['root', 'select', 'filled', 'outlined', 'standard', 'disabled', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput']);
export default nativeSelectClasses;