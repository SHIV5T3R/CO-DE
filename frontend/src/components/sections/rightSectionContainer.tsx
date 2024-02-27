import React from "react";
import TabTray from "./tabTray";
import CodeEditor, { IStandaloneCodeEditor } from "../code_editor/CodeEditor";

import { Split, SplitProps } from "@geoffcox/react-splitter";
import { useTheme } from "@/shadcn/components/ui/theme-provider";
import useDocumentStore from "@/stores/useDocumentStore";
import { CODENodeModel } from "@/types/documentModel";
import { getFileType } from "@/lib/utils";
import WelcomeScreen from "../ui/welcomeScreen";
import { ReactTerminal, TerminalContextProvider } from 'react-terminal';
import RightSidebar from "./rightSidebar";
import useEditorConfigStore from "@/stores/useEditorConfigStore";
import { splitterColors } from "@/utils/utils";
type Props = {};

const RightSectionContainer = (props: Props) => {
  const { theme } = useTheme();
  const editorRef = React.useRef<IStandaloneCodeEditor | null>(null);
  const [documentNodes, setDocumentNodes, selectedNode, setSelectedNode] =
    useDocumentStore((state) => [
      state.documentNodes,
      state.setDocumentNodes,
      state.selectedNode,
      state.setSelectedNode,
    ]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useEditorConfigStore(
    (state) => [state.isSidebarCollapsed, state.setIsSidebarCollapsed]
  );
  React.useEffect(() => {
    if (!!selectedNode.node && !selectedNode.node.data?.isFolder) {
      if (editorRef && editorRef.current) {
        editorRef.current.focus();
      }
    }
  }, [selectedNode.node]);

  const splitterConfig: SplitProps = {
    minPrimarySize: isSidebarCollapsed ? "100%" : "60%",
    minSecondarySize: "340px",
    initialPrimarySize: "70%",
  };

  const horizontalSplitterConfig: SplitProps = {
    // minPrimarySize: "60%",
    // minSecondarySize: "340px",
    // initialPrimarySize: "70%",
  }

  const terminalThemes = {
    "tokyo-night-light": {
      themeBGColor: "#cbccd1",
      themeToolbarColor: "#cbccd1",
      themeColor: "#FFFEFC",
      themePromptColor: "#a917a8"
    },
    "tokyo-night-storm": {
      themeBGColor: "#1f2335",
      themeToolbarColor: "#1f2335",
      themeColor: "#FFFEFC",
      themePromptColor: "#a917a8"
    }
  }

  const commands = {
    hello: "this is terminal",
  };

  const handleSelectedNodeContent = React.useCallback(
    (value: string) => {
      if (!!selectedNode.node) {
        setDocumentNodes(
          documentNodes.map((node) => {
            if (node.id === selectedNode.node?.id) {
              return {
                ...node,
                data: { ...node.data, codeContent: value },
              } as CODENodeModel;
            }
            return node;
          })
        );
      }
    },
    [selectedNode]
  );
  return (
    <TerminalContextProvider>
      <div className="r-section-container flex h-full w-full shrink flex-col transition-all">
        <TabTray />
        <Split
          defaultSplitterColors={splitterColors}
          {...splitterConfig}
        >
          {selectedNode.node === null ||
          (selectedNode.node !== null &&
            selectedNode.node.data?.isFolder === true) ? (
              <Split
                horizontal
                splitterSize="2px"
                defaultSplitterColors={splitterColors}
              >
                <WelcomeScreen />
                <ReactTerminal 
                  commands={commands} 
                  theme={
                    theme === "light" ? "tokyo-night-light" : "tokyo-night-storm"
                  }
                  themes={terminalThemes}
                  showControlBar={false}
                />
              </Split>
          ) : (
            <CodeEditor
              modifyDocumentNodeContent={handleSelectedNodeContent}
              ref={editorRef}
              path={selectedNode.node.text}
              defaultLanguage={selectedNode.node.data?.language}
              defaultValue={selectedNode.node.data?.codeContent}
              width={"100%"}
              height={"100%"}
              editorTheme={
                theme === "light" ? "tokyo-night-light" : "tokyo-night-storm"
              }
              fileExtension={getFileType(selectedNode.node.text)}
            />
          )}
          <RightSidebar />
        </Split>
      </div>
    </TerminalContextProvider>
  );
};

export default RightSectionContainer;