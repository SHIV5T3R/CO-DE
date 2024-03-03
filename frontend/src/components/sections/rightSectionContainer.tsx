import React, { useEffect, useState } from "react";
import useEditorConfigStore from "@/stores/useEditorConfigStore";
import { splitterColors } from "@/utils/utils";
import { useTheme } from "@/shadcn/components/ui/theme-provider";
import useDocumentStore from "@/stores/useDocumentStore";
import { CODENodeModel } from "@/types/documentModel";
import { getFileType } from "@/lib/utils";

import TabTray from "./tabTray";
import CodeEditor, { IStandaloneCodeEditor } from "../code_editor/CodeEditor";
import { Split, SplitProps } from "@geoffcox/react-splitter";
import WelcomeScreen from "../ui/welcomeScreen";
import { TerminalContextProvider } from 'react-terminal';
import RightSidebar from "./rightSidebar";
import Terminal from "./terminal";
type Props = {};

const RightSectionContainer = (props: Props) => {
  const { theme } = useTheme();
  const editorRef = React.useRef<IStandaloneCodeEditor | null>(null);
  const [terminalHeight, setTerminalHeight] = useState('75%')
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [documentNodes, setDocumentNodes, selectedNode, setSelectedNode] =
    useDocumentStore((state) => [
      state.documentNodes,
      state.setDocumentNodes,
      state.selectedNode,
      state.setSelectedNode,
    ]);
  const {
    isSidebarCollapsed, 
    isTerminalVisible,
    setIsSidebarCollapsed,
    setIsTerminalVisible
  } = useEditorConfigStore(state => state);
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

  const onSplitChanged = (primarySize: string) => {
    setTerminalHeight(primarySize);
    if (primarySize === '100%') {
      setIsTerminalVisible(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      } else {
        setKeysPressed(prev => [...prev, e.key]);
      }
    }
    
    const handleKeyUp = () => {
      // open terminal on Ctrl+` key press
      if (keysPressed[0] === 'Control' && keysPressed[1] === '`') {
        setIsTerminalVisible(true);
      }
      setKeysPressed([]);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [keysPressed]);

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
              isTerminalVisible ? (
                <Split
                  horizontal
                  splitterSize="2px"
                  initialPrimarySize={terminalHeight}
                  defaultSplitterColors={splitterColors}
                  onSplitChanged={onSplitChanged}
                >
                  <WelcomeScreen />
                  <Terminal />
                </Split>
              ) : (
                <WelcomeScreen />
              )
          ) : (
            isTerminalVisible ? (
              <Split
                horizontal
                splitterSize="2px"
                initialPrimarySize={terminalHeight}
                defaultSplitterColors={splitterColors}
                onSplitChanged={onSplitChanged}
              >
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
                <Terminal />
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
              )
          )}
          <RightSidebar />
        </Split>
      </div>
    </TerminalContextProvider>
  );
};

export default RightSectionContainer;