// copied from "node_modules/monaco-editor/esm/vs/editor/editor.api.d.ts" to not use ts-ignore,
// and also maybe we will want to have a custom editor theme in the future
export type BuiltinTheme = "vs" | "vs-dark" | "hc-black" | "hc-light";

export interface IStandaloneThemeData {
  base: BuiltinTheme;
  inherit: boolean;
  rules: ITokenThemeRule[];
  encodedTokensColors?: string[];
  colors: IColors;
}

export type IColors = {
  [colorId: string]: string;
};

export interface ITokenThemeRule {
  token: string;
  foreground?: string;
  background?: string;
  fontStyle?: string;
}

// console.log(Object.keys(themeList))
export const monacoThemes = [
  "active4d",
  "all-hallows-eve",
  "amy",
  "birds-of-paradise",
  "blackboard",
  "brilliance-black",
  "brilliance-dull",
  "chrome-devtools",
  "clouds-midnight",
  "clouds",
  "cobalt",
  "cobalt2",
  "dawn",
  "dracula",
  "dreamweaver",
  "eiffel",
  "espresso-libre",
  "github-dark",
  "github-light",
  "github",
  "idle",
  "katzenmilch",
  "kuroir-theme",
  "lazy",
  "magicwb--amiga-",
  "merbivore-soft",
  "merbivore",
  "monokai-bright",
  "monokai",
  "night-owl",
  "nord",
  "oceanic-next",
  "pastels-on-dark",
  "slush-and-poppies",
  "solarized-dark",
  "solarized-light",
  "spacecadet",
  "sunburst",
  "textmate--mac-classic-",
  "tokyo-night-storm",
  "tokyo-night-light",
  "tomorrow-night-blue",
  "tomorrow-night-bright",
  "tomorrow-night-eighties",
  "tomorrow-night",
  "tomorrow",
  "twilight",
  "upstream-sunburst",
  "vibrant-ink",
  "xcode-default",
  "zenburnesque",
  "iplastic",
  "idlefingers",
  "krtheme",
  "monoindustrial",
] as const;

export type MonacoTheme = (typeof monacoThemes)[number];

// copied from "monaco-themes" npm package
export const themeList: { [p: string]: string } = {
  active4d: "Active4D",
  "all-hallows-eve": "All Hallows Eve",
  amy: "Amy",
  "birds-of-paradise": "Birds of Paradise",
  blackboard: "Blackboard",
  "brilliance-black": "Brilliance Black",
  "brilliance-dull": "Brilliance Dull",
  "chrome-devtools": "Chrome DevTools",
  "clouds-midnight": "Clouds Midnight",
  clouds: "Clouds",
  cobalt: "Cobalt",
  cobalt2: "Cobalt2",
  dawn: "Dawn",
  dracula: "Dracula",
  dreamweaver: "Dreamweaver",
  eiffel: "Eiffel",
  "espresso-libre": "Espresso Libre",
  "github-dark": "GitHub Dark",
  "github-light": "GitHub Light",
  github: "GitHub",
  idle: "IDLE",
  katzenmilch: "Katzenmilch",
  "kuroir-theme": "Kuroir Theme",
  lazy: "LAZY",
  "magicwb--amiga-": "MagicWB (Amiga)",
  "merbivore-soft": "Merbivore Soft",
  merbivore: "Merbivore",
  "monokai-bright": "Monokai Bright",
  monokai: "Monokai",
  "night-owl": "Night Owl",
  nord: "Nord",
  "oceanic-next": "Oceanic Next",
  "pastels-on-dark": "Pastels on Dark",
  "slush-and-poppies": "Slush and Poppies",
  "solarized-dark": "Solarized-dark",
  "solarized-light": "Solarized-light",
  spacecadet: "SpaceCadet",
  sunburst: "Sunburst",
  "textmate--mac-classic-": "Textmate (Mac Classic)",
  "tokyo-night-storm": "Tokyo-Night-Storm",
  "tokyo-night-light": "Tokyo-Night-Light",
  "tomorrow-night-blue": "Tomorrow-Night-Blue",
  "tomorrow-night-bright": "Tomorrow-Night-Bright",
  "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
  "tomorrow-night": "Tomorrow-Night",
  tomorrow: "Tomorrow",
  twilight: "Twilight",
  "upstream-sunburst": "Upstream Sunburst",
  "vibrant-ink": "Vibrant Ink",
  "xcode-default": "Xcode_default",
  zenburnesque: "Zenburnesque",
  iplastic: "iPlastic",
  idlefingers: "idleFingers",
  krtheme: "krTheme",
  monoindustrial: "monoindustrial",
};

//This is a map of extensions to the icon file names in /src/components/code_editor/editor_icons
export const fileTypeIconsList = {
  ".js": "file_type_js",
  ".gitignore": "file_type_git",
  ".ts": "file_type_typescript",
  ".txt": "file_type_text",
  ".tsx": "file_type_typescript",
  ".json": "file_type_json",
  ".css": "file_type_css",
  ".html": "file_type_html",
  ".favicon": "file_type_favicon",
  ".eslint": "file_type_eslint",
};
export type FileTypeExtensions = typeof fileTypeIconsList;
