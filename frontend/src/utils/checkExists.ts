/**
 * Checks if a field is neither null nor undefined
 * @param {*} value - The value to be checked
 * @returns {boolean} - True if the value is neither null or undefined.
 */
export default function checkExists(value: any | null | undefined): boolean {
  return value != undefined && value != null;
}
