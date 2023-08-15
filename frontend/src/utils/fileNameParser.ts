import CheckExists from "./checkExists";

const fileExtensions = {
  "default-file": { name: "Default", icon: "default_file.svg" },
  ".ts": { name: "TypeScript", icon: "file_type_typesript_official.svg" },
  ".tsx": { name: "TypeScript", icon: "file_type_typesript_official.svg" },
  ".css": { name: "CSS", icon: "file_type_css.svg" },
  ".json": { name: "JSON", icon: "file_type_json.svg" },
};

const folderIcons = {
  "default-folder": {
    open: "default_folder_opened.svg",
    closed: "default_folder.svg",
  },
  lib: {
    open: "folder_type_library_opened.svg",
    closed: "folder_type_library.svg",
  },
  css: { open: "folder_type_css_opened.svg", closed: "folder_type_css.svg" },
};

/**
 * parseFileName
 * @param fileName The name of the file.
 * @returns An object for instance for test.ts it would be: { name: "TypeScript", icon: "Typescript.png" }
 */
function parseFileName(fileName: string) {
  const fileExtension = fileName.split(".").pop();
  return fileExtensions[fileExtension]
    ? CheckExists(fileExtensions[fileExtension])
    : fileExtensions["default-file"];
}

/**
 *
 * @param folderName The name of the folder;
 * @returns An object for instance for lib it would be { open: "lib-open.png", closed: "lib-closed.png" }
 */
function parseFolderName(folderName: string) {
  return folderIcons[folderName]
    ? CheckExists(folderIcons[folderName])
    : folderIcons["default-folder"];
}

export { fileExtensions, parseFileName, parseFolderName };
