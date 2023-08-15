import checkExists from "./checkExists";

/**
 * 
 * @param {number} value - The number to check whether or not it's valid.
 * @returns {boolean} - Returns true if the number is valid.
 */
export default function isNumberValid(
  value: number | null | undefined
): boolean {
  return checkExists(value) && typeof value == "number";
}
