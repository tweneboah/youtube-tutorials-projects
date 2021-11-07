import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getSkeletonUtilityClass(slot) {
  return generateUtilityClass('MuiSkeleton', slot);
}
var skeletonClasses = generateUtilityClasses('MuiSkeleton', ['root', 'text', 'rectangular', 'circular', 'pulse', 'wave', 'withChildren', 'fitContent', 'heightAuto']);
export default skeletonClasses;