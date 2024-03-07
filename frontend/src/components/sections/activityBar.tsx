import {
  FileSearch,
  Folders,
  GitFork,
  Github,
  LucideIcon,
  Menu,
  Settings,
  SquareDashedBottomCode,
  User,
} from "lucide-react";
import { ModeToggle } from "shadcn/ui/mode-toggle";

import Logo from "@/components/ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import useEditorConfigStore from "@/stores/useEditorConfigStore";

type Props = {};

const TOPSEGMENTICONS: Array<{ id: number; element: LucideIcon }> = [
  { id: 1, element: Menu },
  { id: 2, element: Folders },
  { id: 3, element: FileSearch },
  { id: 4, element: GitFork },
  { id: 5, element: Github },
  { id: 6, element: SquareDashedBottomCode },
];

const BOTTOMSEGMENTICONS: Array<{ id: number; element: LucideIcon }> = [
  { id: 1, element: User },
  { id: 2, element: Settings },
];
function ActivityBar(props: Props) {
  const { isTerminalVisible, setIsTerminalVisible } = useEditorConfigStore(
    (state) => state
  );

  return (
    <nav className="flex h-full w-fit justify-end  py-4  pl-4">
      <div className=" flex h-full w-[56px] flex-col items-center justify-between rounded-xl border border-border/60 bg-background p-2">
        <div className="flex h-fit w-full flex-col  items-center gap-6">
          <Logo size="md" noText />
          {TOPSEGMENTICONS.map((Icon) => {
            if (Icon.element === Menu) {
              return (
                <DropdownMenu key={Icon.id}>
                  <DropdownMenuTrigger
                    className="rounded-lg p-2"
                    aria-label="menu"
                    onClick={() => console.log("button clicked")}
                  >
                    <Icon.element className="text-muted-foreground hover:text-muted" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="cursor-pointer text-sm"
                        onClick={() =>
                          isTerminalVisible
                            ? setIsTerminalVisible(false)
                            : setIsTerminalVisible(true)
                        }
                      >
                        Create terminal
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Popover key={Icon.id}>
                <PopoverTrigger className="rounded-lg p-2 ">
                  <Icon.element className="text-muted-foreground hover:text-muted" />
                </PopoverTrigger>
                <PopoverContent side="right">This is a popover</PopoverContent>
              </Popover>
            );
          })}
        </div>

        <div className="flex h-fit w-full flex-col gap-6">
          <ModeToggle />
          {BOTTOMSEGMENTICONS.map((Icon) => {
            return (
              <Popover key={Icon.id}>
                <PopoverTrigger className="rounded-lg p-2">
                  <Icon.element className="text-muted-foreground hover:text-muted" />
                </PopoverTrigger>
                <PopoverContent side="right">This is a popover</PopoverContent>
              </Popover>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default ActivityBar;
