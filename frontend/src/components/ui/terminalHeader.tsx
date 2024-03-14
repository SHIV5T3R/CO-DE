import { X } from "lucide-react";

import useEditorConfigStore from "@/stores/useEditorConfigStore";

export default function TerminalHeader() {
  const { setIsTerminalVisible } = useEditorConfigStore((state) => state);

  return (
    <div className="flex w-full items-center justify-between px-4 py-1 text-xs text-muted/70">
      <p className="border-b border-accent">TERMINAL</p>
      <button
        className="rounded-sm p-0.5 transition-colors hover:bg-muted-foreground/20"
        onClick={() => setIsTerminalVisible(false)}
        type="button"
        aria-label="close-terminal"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
