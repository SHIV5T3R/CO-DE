import type { NodeModel } from "@minoru/react-dnd-treeview";

export type FileAttributes = {
  uri?: string;
  isActive: boolean;
  isFolder: boolean;
  focus?: boolean;
  language?: string;
  isGitModified?: boolean;
  isGitUntracked?: boolean;
  onTab?: boolean;
  codeContent?: string;
  opened: ReturnType<typeof Date.now>;
};
export type CODENodeModel = NodeModel<FileAttributes>;
export type DocumentNodeStore = {
  documentNodes: Array<CODENodeModel>;
  setDocumentNodes: (incomingDocumentNodes: Array<CODENodeModel>) => void;
  selectedNode: { node: CODENodeModel | null };
  setSelectedNode: (node: CODENodeModel | null) => void;
};
export type EditorConfigStore = {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: () => void;
};
