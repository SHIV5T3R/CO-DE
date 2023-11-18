import React, { ComponentProps, useState } from "react";
import { Editor, EditorProps, OnMount, loader } from "@monaco-editor/react";

import {
  IStandaloneThemeData,
  MonacoTheme,
  themeList,
} from "components/code_editor/CodeEditorTypes";
import { useTheme } from "shadcn/ui/theme-provider";

export type IStandaloneCodeEditor = Parameters<OnMount>[0];
type IStandaloneCodeEditorLayout = Parameters<OnMount>[0]["layout"];
type IDimension = Parameters<IStandaloneCodeEditorLayout>[0];
type CodeEditorProps = {
  fileExtension: string;
  editorTheme?: MonacoTheme;
  fontSize?: number;
  modifyDocumentNodeContent: (value: string) => void;
  code?: string;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
} & EditorProps;

export type EditorComponent = ComponentProps<typeof Editor>;

const CodeEditor = React.forwardRef<IStandaloneCodeEditor, CodeEditorProps>(
  (
    {
      fileExtension,
      editorTheme,
      fontSize,
      modifyDocumentNodeContent,
      code,
      setCode,
      ...props
    }: CodeEditorProps,
    ref
  ) => {
    const [themeLoaded, setThemeLoaded] = React.useState<boolean>(false);
    const [language, setLanguage] = React.useState<string>("");
    const { theme: currentAppTheme } = useTheme();
    const [renderedTheme, setRenderedTheme] = useState<MonacoTheme | string>();
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
        import(`./editor_themes/${themeList[editorTheme]}.json`).then(
          (data) => {
            monaco.editor.defineTheme(
              editorTheme,
              data as IStandaloneThemeData
            );
            setThemeLoaded(true);
          }
        );
      });
    }, [editorTheme]);


    const handleEditorChange = (value: string | undefined) => {
 
      if (value) {
        modifyDocumentNodeContent(value);
      }
    };

    React.useEffect(() => {
      if (themeLoaded) {
        setRenderedTheme(editorTheme);
      } else {
        setRenderedTheme(currentAppTheme === "light" ? "light" : "vs-dark");
      }
    }, [themeLoaded]);

    const options: EditorProps["options"] = {
      fontSize,
    };
    return (
      <div className="h-full w-full shrink ">
        <Editor
          onMount={(editor) => {
            if (typeof ref === "function") {
              ref(editor);
            } else if (ref) {
              ref.current = editor;
            }
          }}
          language={language}
          theme={renderedTheme}
          options={options}
          value={code}
          onChange={handleEditorChange}
          {...props}
        />
      </div>
    );
  }
);
export default CodeEditor;
