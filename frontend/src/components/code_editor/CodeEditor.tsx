import {Editor, loader} from "@monaco-editor/react";
import React from "react";
import {useTheme} from "shadcn/ui/theme-provider";

type CodeEditorProps = {
    width?: number | string,
    height?: number | string
    fileExtension: string,
    editorTheme?: MonacoTheme,
    initialCode?: string,
    setCode?: React.Dispatch<React.SetStateAction<string>>
}

function CodeEditor({ width, height, fileExtension, editorTheme, initialCode, setCode }: CodeEditorProps) {
    const [themeLoaded, setThemeLoaded] = React.useState<boolean>(false);
    const [language, setLanguage] = React.useState<string>("");
    const {theme} = useTheme();

    React.useEffect(() => {
        loader
            .init()
            .then(monaco => {
                let found: boolean = false;

                for (let lang of monaco.languages.getLanguages()) {
                    if (lang.extensions?.includes(fileExtension)) {
                        setLanguage(lang.id);
                        found = true;
                        break;
                    }
                }

                if (!found) setLanguage("");
            })
    }, [fileExtension]);

    React.useEffect(() => {
        setThemeLoaded(false);

        if (!editorTheme) return;

        loader
            .init()
            .then(monaco => {
                import(`./editor_themes/${themeList[editorTheme]}.json`)
                    .then(data => {
                        monaco.editor.defineTheme(editorTheme, data as IStandaloneThemeData);
                        setThemeLoaded(true);
                    })
            })
    }, [editorTheme]);

    const handleEditorChange = (value: string | undefined) => {
        if (setCode) setCode(prevState => value === undefined ? prevState : value);
    }

    let renderedTheme: string | undefined;
    if (themeLoaded) {
        renderedTheme = editorTheme;
    } else {
        renderedTheme = theme === "light" ? "light" : "vs-dark";
    }

    return (
      <Editor
          width={width}
          height={height}
          language={language}
          theme={renderedTheme}
          defaultValue={initialCode}
          onChange={handleEditorChange}
      />
    );
}

export default CodeEditor;

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
    "monoindustrial"
] as const;

export type MonacoTheme = typeof monacoThemes[number];

// copied from "monaco-themes" npm package
export const themeList: { [p: string]: string } = {
    "active4d": "Active4D",
    "all-hallows-eve": "All Hallows Eve",
    "amy": "Amy",
    "birds-of-paradise": "Birds of Paradise",
    "blackboard": "Blackboard",
    "brilliance-black": "Brilliance Black",
    "brilliance-dull": "Brilliance Dull",
    "chrome-devtools": "Chrome DevTools",
    "clouds-midnight": "Clouds Midnight",
    "clouds": "Clouds",
    "cobalt": "Cobalt",
    "cobalt2": "Cobalt2",
    "dawn": "Dawn",
    "dracula": "Dracula",
    "dreamweaver": "Dreamweaver",
    "eiffel": "Eiffel",
    "espresso-libre": "Espresso Libre",
    "github-dark": "GitHub Dark",
    "github-light": "GitHub Light",
    "github": "GitHub",
    "idle": "IDLE",
    "katzenmilch": "Katzenmilch",
    "kuroir-theme": "Kuroir Theme",
    "lazy": "LAZY",
    "magicwb--amiga-": "MagicWB (Amiga)",
    "merbivore-soft": "Merbivore Soft",
    "merbivore": "Merbivore",
    "monokai-bright": "Monokai Bright",
    "monokai": "Monokai",
    "night-owl": "Night Owl",
    "nord": "Nord",
    "oceanic-next": "Oceanic Next",
    "pastels-on-dark": "Pastels on Dark",
    "slush-and-poppies": "Slush and Poppies",
    "solarized-dark": "Solarized-dark",
    "solarized-light": "Solarized-light",
    "spacecadet": "SpaceCadet",
    "sunburst": "Sunburst",
    "textmate--mac-classic-": "Textmate (Mac Classic)",
    "tomorrow-night-blue": "Tomorrow-Night-Blue",
    "tomorrow-night-bright": "Tomorrow-Night-Bright",
    "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
    "tomorrow-night": "Tomorrow-Night",
    "tomorrow": "Tomorrow",
    "twilight": "Twilight",
    "upstream-sunburst": "Upstream Sunburst",
    "vibrant-ink": "Vibrant Ink",
    "xcode-default": "Xcode_default",
    "zenburnesque": "Zenburnesque",
    "iplastic": "iPlastic",
    "idlefingers": "idleFingers",
    "krtheme": "krTheme",
    "monoindustrial": "monoindustrial"
};
