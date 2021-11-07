/// <reference types="react" />
/**
 * Appends the ownerState object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node, `ownerState` are not applied.
 * @param existingProps Props of the element.
 * @param ownerState
 */
export default function appendOwnerState(elementType: React.ElementType, existingProps: Record<string, any>, ownerState: object): Record<string, any>;
