export const removeField = <T, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const copyObj = { ...obj };
  keys.forEach((key) => delete copyObj[key]);
  return copyObj;
};

export type SplitterColors = {
  color: string;
  drag: string;
  hover: string;
};

export const splitterColors: SplitterColors = {
  color: "hsl(var(--border-secondary))",
  drag: "hsl(var(--border-hover))",
  hover: "hsl(var(--border-hover))",
};
