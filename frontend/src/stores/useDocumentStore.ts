import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DocumentNodeStore } from "@/types/documentModel";

const useDocumentStore = create<DocumentNodeStore>()(
  persist(
    (set, get) => ({
      // states
      documentNodes: [],
      selectedNode: { node: null },
      // state setters
      setSelectedNode: (node) => set({ selectedNode: { node } }),
      setDocumentNodes: (incomingDocumentNodes) =>
        set({ documentNodes: incomingDocumentNodes }),
    }),
    {
      name: "code_docs_store", // unique name
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useDocumentStore;
