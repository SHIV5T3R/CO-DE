import React from "react";
import { Editor, loader } from "@monaco-editor/react";
import {
  IStandaloneThemeData,
  MonacoTheme,
  themeList,
} from "components/code_editor/CodeEditorTypes";
import { useTheme } from "shadcn/ui/theme-provider";

type CodeEditorProps = {
  width?: number | string;
  height?: number | string;
  fileExtension: string;
  editorTheme?: MonacoTheme;
  fontSize?: number;
  code?: string;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
};

function CodeEditor({
  width,
  height,
  fileExtension,
  editorTheme,
  fontSize,
  code,
  setCode,
}: CodeEditorProps) {
  const [themeLoaded, setThemeLoaded] = React.useState<boolean>(false);
  const [language, setLanguage] = React.useState<string>("");
  const { theme } = useTheme();

  React.useEffect(() => {
    loader.init().then((monaco) => {
      let found: boolean = false;

      // ESLint complaining about i++ here??? lol
      for (let i = 0; i < monaco.languages.getLanguages().length; i += 1) {
        const lang = monaco.languages.getLanguages()[i];
        if (lang.extensions?.includes(fileExtension)) {
          setLanguage(lang.id);
          found = true;
          break;
        }
      }

      if (!found) setLanguage("");
    });
  }, [fileExtension]);

  React.useEffect(() => {
    setThemeLoaded(false);

    if (!editorTheme) return;

    loader.init().then((monaco) => {
      import(`./editor_themes/${themeList[editorTheme]}.json`).then((data) => {
        monaco.editor.defineTheme(editorTheme, data as IStandaloneThemeData);
        setThemeLoaded(true);
      });
    });
  }, [editorTheme]);

  const handleEditorChange = (value: string | undefined) => {
    if (setCode)
      setCode((prevState) => (value === undefined ? prevState : value));
  };

  let renderedTheme: string | undefined;
  if (themeLoaded) {
    renderedTheme = editorTheme;
  } else {
    renderedTheme = theme === "light" ? "light" : "vs-dark";
  }

  const options = {
    fontSize,
  };

  return (
    <Editor
      width={width}
      height={height}
      language={language}
      theme={renderedTheme}
      options={options}
      value={code}
      onChange={handleEditorChange}
    />
  );
}

export default CodeEditor;
