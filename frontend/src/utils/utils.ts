export const removeField = <T, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const copyObj = { ...obj };
  keys.forEach((key) => delete copyObj[key]);
  return copyObj;
};
