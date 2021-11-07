/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 */
export default function extractEventHandlers(object: Record<string, any> | undefined, excludeKeys?: string[]): Record<string, any>;
