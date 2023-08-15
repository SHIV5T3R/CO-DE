import checkExists from "./checkExists";
/**
 * Checks if a field is a valid string
 * @param {*} value - The value to be checked
 * @returns {boolean} - True if the value is a string.
 */
export default function isStringValid(
  value: string | null | undefined
): boolean {
  return checkExists(value) && typeof value == "string";
}
