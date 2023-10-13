import { persist, createJSONStorage } from "zustand/middleware";
import { DocumentNodeStore } from "@/types/documentModel";
import { create } from "zustand";

const useDocumentStore = create<DocumentNodeStore>()(
  persist(
    (set, get) => ({
      //states
      documentNodes: [],
      selectedNode: { node: null },
      //state setters
      setSelectedNode: (node) => set({ selectedNode: { node } }),
      setDocumentNodes: (incomingDocumentNodes) =>
        set({ documentNodes: incomingDocumentNodes }),
      isSidebarCollapsed: true,
      collapseSidebar: () => set((state) => ({isSidebarCollapsed: !state.isSidebarCollapsed}))
    }),
    {
      name: "code_docs_store", // unique name
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useDocumentStore;
