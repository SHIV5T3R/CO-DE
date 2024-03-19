import { persist, createJSONStorage } from "zustand/middleware";
import { EditorConfigStore } from "@/types/documentModel";
import { create } from "zustand";

const useEditorConfigStore = create<EditorConfigStore>()(
  persist(
    (set, get) => ({
      //states
      isSidebarCollapsed: true,
      //state setters

      setIsSidebarCollapsed: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: "code_editor_config", // unique name
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useEditorConfigStore;
