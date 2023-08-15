import checkExists from "./checkExists";

/**
 * 
 * @param {object} obj - The value to check.
 * @param {string} key - The value to check for.
 * @returns {boolean} - True if the object includes the key.
 */
export default function doesObjectHaveKey(
  obj: object | null | undefined,
  key: string
): boolean {
  return checkExists(obj) && key in obj;
}
