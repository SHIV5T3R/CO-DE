import {
  Bell,
  LucideIcon,
  MoreHorizontal,
  SplitSquareHorizontal,
} from "lucide-react";
import FileTab from "@/components/ui/fileTab";
import useDocumentStore from "@/stores/useDocumentStore";
import PlaceholderFileTab from "../ui/placeholderFileTab";

type TabTrayProps = {};

const TABTRAYICONS: Array<{ id: number; element: LucideIcon }> = [
  { id: 1, element: Bell },
  { id: 2, element: SplitSquareHorizontal },
  { id: 3, element: MoreHorizontal },
];

const TabTray = ({}: TabTrayProps) => {
  const documentNodes = useDocumentStore((state) => state.documentNodes);
  const onTabsTrayList = documentNodes.filter(
    (node) => node.data?.onTab === true
  );

  return (
    <nav className="flex h-9 w-full gap-2 bg-background pr-6">
      <div className="flex h-full w-full overflow-x-auto border-y border-y-border-secondary   scrollbar-none scrollbar-track-background  scrollbar-thumb-muted/30 scrollbar-thumb-rounded-md hover:scrollbar-thin ">
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
      <div className="flex h-full w-fit items-center justify-center gap-3">
        {TABTRAYICONS.map((Icon) => {
          return (
            <Icon.element
              key={Icon.id}
              className="p2 text-muted-foreground hover:text-muted"
            />
          );
        })}
      </div>
    </nav>
  );
};

export default TabTray;
