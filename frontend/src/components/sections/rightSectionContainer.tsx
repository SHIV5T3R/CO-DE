import React from "react";
import TabTray from "./tabTray";
import CodeEditor, { IStandaloneCodeEditor } from "../code_editor/CodeEditor";

import { useTheme } from "@/shadcn/components/ui/theme-provider";
import useDocumentStore from "@/stores/useDocumentStore";
import { CODENodeModel } from "@/types/documentModel";
import { getFileType } from "@/lib/utils";
import WelcomeScreen from "../ui/welcomeScreen";
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

  React.useEffect(() => {
    if (!!selectedNode.node && !selectedNode.node.data?.isFolder) {
      if (editorRef && editorRef.current) {
        editorRef.current.focus();
      }
    }
  }, [selectedNode.node]);

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
    <div className=" flex h-full w-full shrink flex-col">
      <TabTray />

      {selectedNode.node === null ||
      (selectedNode.node !== null &&
        selectedNode.node.data?.isFolder === true) ? (
        <WelcomeScreen />
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
    </div>
  );
};

export default RightSectionContainer;
