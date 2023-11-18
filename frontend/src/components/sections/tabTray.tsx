import {
  Bell,
  LucideIcon,
  MoreHorizontal,
  PanelRightClose,
  PanelRightOpen,
  SplitSquareHorizontal,
} from "lucide-react";
import FileTab from "@/components/ui/fileTab";
import useDocumentStore from "@/stores/useDocumentStore";
import PlaceholderFileTab from "../ui/placeholderFileTab";
import useEditorConfigStore from "@/stores/useEditorConfigStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/components/ui/tooltip";

type TabTrayProps = {};

const TABTRAYICONS: Array<{ id: number; element: LucideIcon }> = [
  { id: 1, element: Bell },
  { id: 2, element: SplitSquareHorizontal },
  { id: 3, element: MoreHorizontal },
  { id: 4, element: PanelRightClose },
];

const TabTray = ({}: TabTrayProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useEditorConfigStore(
    (state) => [state.isSidebarCollapsed, state.setIsSidebarCollapsed]
  );
  const documentNodes = useDocumentStore((state) => state.documentNodes);
  const onTabsTrayList = documentNodes.filter(
    (node) => node.data?.onTab === true
  );

  return (
    <nav className="flex h-9 w-full  bg-background ">
      <div className="flex h-full w-full overflow-x-auto border-b border-b-border-secondary   scrollbar-none scrollbar-track-background  scrollbar-thumb-muted/30 scrollbar-thumb-rounded-md hover:scrollbar-thin ">
        {/* Will contain tabs */}
        {onTabsTrayList.length === 0 ? (
          <PlaceholderFileTab />
        ) : (
          onTabsTrayList.map((tab, idx) => {
            return (
              <FileTab
                active={tab.data?.focus!}
                tabId={tab.id}
                key={tab.id}
                fileName={tab.text}
              />
            );
          })
        )}
      </div>
      <div className="flex h-full w-fit items-center justify-center gap-3 border-b border-b-border-secondary pr-6">
        {TABTRAYICONS.map((Icon) => {
          if (Icon.id === 4) {
            return (
              <TooltipProvider delayDuration={50} key={Icon.id}>
                <Tooltip>
                  <TooltipTrigger
                    className="p-0 text-muted-foreground hover:text-muted"
                    onClick={setIsSidebarCollapsed}
                  >
                    {isSidebarCollapsed ? (
                      <Icon.element className="h-5 w-5" />
                    ) : (
                      <PanelRightOpen className="h-5 w-5" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent> Room </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }
          return (
            <TooltipProvider delayDuration={50} key={Icon.id}>
              <Tooltip>
                <TooltipTrigger className="p-0 text-muted-foreground hover:text-muted">
                  <Icon.element className="h-5 w-5" />
                </TooltipTrigger>
                <TooltipContent> Tab icon</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </nav>
  );
};

export default TabTray;
