import React from "react";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { mockDirectory } from "@/mocks/mockDirectory";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import useDocumentStore from "@/stores/useDocumentStore";
import { CODENodeModel } from "@/types/documentModel";

const ExplorerTreeView = () => {
  const [documentNodes, setDocumentNodes, selectedNode, setSelectedNode] =
    useDocumentStore((state) => [
      state.documentNodes,
      state.setDocumentNodes,
      state.selectedNode,
      state.setSelectedNode,
    ]);
  React.useEffect(() => {
    //initialise the mockDirectory into session storage on initial load if not present.
    if (documentNodes.length === 0) {
      setDocumentNodes(mockDirectory);
    }
  }, [documentNodes]);
  const handleDrop = (newTree: CODENodeModel[]) => setDocumentNodes(newTree);

  const handleSelect = (node: CODENodeModel) => {
    const mutatedDocumentNodes = documentNodes.map((prevNode) => {
      if (prevNode.id === node.id) {
        return {
          ...prevNode,
          data: {
            ...prevNode.data,
            isActive: true,
            opened: !node.data?.isFolder ? Date.now() : 0,
            focus: !node.data?.isFolder,
            onTab: !node.data?.isFolder,
          },
        } as CODENodeModel;
      }
      return {
        ...prevNode,
        data: {
          ...prevNode.data,

          isActive: false,
          focus: false,
        },
      } as CODENodeModel;
    });
    const openedNodeStack = mutatedDocumentNodes
      .filter((node) => node.data !== undefined)
      .sort((a, b) => (b.data?.opened || 0) - (a.data?.opened || 0));
    setDocumentNodes(mutatedDocumentNodes);
    if (openedNodeStack.length > 1) {
      if (node.data?.isFolder) {
        const lastOpenedNode = {
          ...openedNodeStack[0],
          data: {
            ...openedNodeStack[0].data,
            isActive: true,
            focus: true,
            opened: Date.now(),
          },
        } as CODENodeModel;
        setSelectedNode(lastOpenedNode);
      } else {
        setSelectedNode(
          mutatedDocumentNodes.find(
            (mutatedNode) => node.id === mutatedNode.id
          ) ?? null
        );
      }
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={documentNodes}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => {
          // const isFolder =
          //   node.data &&
          //   (node as NodeModel<{ isFolder: boolean }>)?.data?.isFolder;
          const isSelectedNode = node.id === selectedNode.node?.id;
          return (
            <div
              aria-labelledby={node.text}
              tabIndex={0}
              onClick={() => {
                onToggle();

                handleSelect(node);
              }}
              className={cn(
                " flex  cursor-pointer items-center rounded-sm px-2 text-muted/70 focus:outline-none focus:ring-1 focus:ring-ring/40 ",
                {
                  "hover:bg-border-secondary": !isSelectedNode,
                  "bg-muted/30 outline outline-[1px] outline-border-secondary ":
                    isSelectedNode,
                }
              )}
              style={{ marginLeft: depth * 10 }}
            >
              {node.droppable &&
                (isOpen ? (
                  <ChevronDown className="h-auto w-4" />
                ) : (
                  <ChevronRight className="h-auto w-4" />
                ))}

              {node.text}
            </div>
          );
        }}
        dragPreviewRender={(monitorProps) => {
          const item = monitorProps.item;

          return (
            <div className=" w-fit rounded-lg bg-muted/10 py-1 pl-2 pr-8 text-muted-foreground">
              <p>{item.text}</p>
            </div>
          );
        }}
        classes={{
          dropTarget: "bg-accent/20",
        }}
      />
    </DndProvider>
  );
};
export default ExplorerTreeView;
