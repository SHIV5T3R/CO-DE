/**
 * CheckExists
 * @param object The object that you want to check exists.
 * @returns If the object exists.
 */
export default function CheckExists(object: object) {
  return object != undefined && object != null;
}
