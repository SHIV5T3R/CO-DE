import { fileTypeIconsList } from "@/components/code_editor/CodeEditorTypes";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFileType(fileName: string) {
  // This function takes a file name, e.g. script.js (including its extension) and returns the extension string ".js"
  const parts = fileName.split(".");

  if (parts.length === 1 || (parts.length === 2 && !parts[1])) {
    return ".txt" as keyof typeof fileTypeIconsList;
  }

  const extension = parts.pop();
  const exceptions = ["gitignore", "env"];

  if (extension) {
    for (let i = 0; i < exceptions.length; i++) {
      if (exceptions[i].includes(extension)) {
        //gitignore and .env are .txt extensions
        return ".txt" as keyof typeof fileTypeIconsList;
      }
    }

    return `.${extension}` as keyof typeof fileTypeIconsList;
  }

  return ".txt" as keyof typeof fileTypeIconsList;
}
