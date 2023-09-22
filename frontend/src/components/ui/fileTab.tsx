import React from "react";
import { X } from "lucide-react";
import { getFileType } from "@/lib/utils";
import { CODENodeModel } from "@/types/documentModel";
import { fileTypeIconsList } from "../code_editor/CodeEditorTypes";
import useDocumentStore from "@/stores/useDocumentStore";

type Props = {
  active: boolean;
  tabId: CODENodeModel["id"];
  fileName: string;
};

const FileTab = ({ fileName, active, tabId, ...props }: Props) => {
  const [documentNodes, setDocumentNodes, selectedNode, setSelectedNode] =
    useDocumentStore((state) => [
      state.documentNodes,
      state.setDocumentNodes,
      state.selectedNode,
      state.setSelectedNode,
    ]);

  const fileType = getFileType(fileName);
  const fileTypeIconSourcePath = `/src/components/code_editor/editor_icons/${fileTypeIconsList[fileType]}.svg`;

  const handleOnTabClick = (tabId: string | number) => {
    //on clicking a file tab, set the active state to true based on its tabId and others to false.
    const updateDocumentNodes = documentNodes.map((node) => {
      return node.id === tabId
        ? {
            ...node,
            data: {
              ...node.data,
              isActive: true,
              focus: true,
              opened: Date.now(),
            },
          }
        : { ...node, data: { ...node.data, isActive: false, focus: false } };
    }) as CODENodeModel[];

    setDocumentNodes(updateDocumentNodes);

    setSelectedNode(
      updateDocumentNodes.find((node) => node.id === tabId) as CODENodeModel
    );
  };
  const onTabClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tabId: string | number
  ) => {
    e.stopPropagation();
    /**if the tab to close is not the currently active/focused node but is on the tab tray, simply modify it's activity attributes to false.
     *
     *  **/
    if (selectedNode.node?.id !== tabId) {
      setDocumentNodes(
        documentNodes.map((node) => {
          if (node.id === tabId) {
            return {
              ...node,
              data: {
                ...node.data,
                opened: 0,
                onTab: false,
                isActive: false,
                focus: false,
              },
            };
          }
          return node;
        }) as CODENodeModel[]
      );
      return;
    }
    const openedNodeStack = documentNodes
      .filter((node) => node.data !== undefined)
      .sort((a, b) => (b.data?.opened || 0) - (a.data?.opened || 0));
    if (openedNodeStack.length > 1) {
      const lastOpenedIndex = 1; //if there are 2 nodes in the stack, the latest one is current node at index of 0 and second latest would be at index of 1
      const lastOpenedNode = {
        ...openedNodeStack[lastOpenedIndex],
        data: {
          ...openedNodeStack[lastOpenedIndex].data,
          focus: true,
          isActive: true,
          opened: Date.now(),
        },
      } as CODENodeModel;

      setSelectedNode(lastOpenedNode);
      setDocumentNodes(
        documentNodes.map((node) => {
          if (node.id === lastOpenedNode.id) {
            return lastOpenedNode;
          }
          return node.id === tabId
            ? {
                ...node,
                data: {
                  ...node.data,
                  isActive: false,
                  opened: 0, //send to bottom of the time stack trace
                  focus: false,
                  onTab: false,
                },
              }
            : {
                ...node,
                data: { ...node.data, isActive: false, focus: false },
              };
        }) as CODENodeModel[]
      );
    } else {
      //this means tab being clicked is the last tab so that means there is no more nodes in the tray or tree that is opened so we set it to null
      setSelectedNode(null);
      setDocumentNodes(
        documentNodes.map((node) => {
          return {
            ...node,
            data: { ...node.data, isActive: false, focus: false, opened: 0 },
          };
        }) as CODENodeModel[]
      );
    }
  };
  return (
    <div
      onClick={(e) => {
        handleOnTabClick(tabId);
      }}
      className={`group flex h-full w-[224px] cursor-pointer items-center justify-between border-x ${
        selectedNode.node?.id === tabId ? "border-b border-accent" : null
      } border-x-border-secondary px-3`}
    >
      <div className="flex w-fit items-center gap-2">
        <img className="h-auto w-4" src={fileTypeIconSourcePath} alt="icon" />
        <span className="text-muted/70">{fileName}</span>
      </div>
      <button onClick={(e) => onTabClose(e, tabId)} aria-label="Close this tab">
        <X size={"18px"} className="hidden  group-hover:inline-block" />
      </button>
    </div>
  );
};

export default FileTab;
