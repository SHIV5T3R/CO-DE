import checkExists from "./checkExists";

/**
 * 
 * @param {any[]} value - The array to check whether is valid or not.
 * @returns {boolean} - Returns true if the array is valid.
 */
export default function isArrayValid(value: any[] | null | undefined): boolean {
  return checkExists(value) && Array.isArray(value) && value.length > 0;
}
