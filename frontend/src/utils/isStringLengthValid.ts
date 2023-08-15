import isStringValid from "./isStringValid";

/**
 * 
 * @param {string} str - The value to check.
 * @param {number} minLength - The minimum length of the string.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {boolean} - If the string is valid.
 */
export default function isStringLengthValid(
  str: string | null | undefined,
  minLength: number,
  maxLength: number
): boolean {
  return (
    isStringValid(str) && str.length >= minLength && str.length <= maxLength
  );
}
