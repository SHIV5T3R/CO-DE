import checkExists from "./checkExists";

/**
 * 
 * @param {any} value - The first value.
 * @param {any} defaultValue - The value that it can default to.
 * @returns {any} - Returns the value if it's valid and if not returns the defaultValue.
 */
export default function getValueOrDefault(value: any | null | undefined, defaultValue: any): any {
  return checkExists(value) ? value : defaultValue;
}
