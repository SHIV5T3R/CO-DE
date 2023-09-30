import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
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
import Logo from "@/components/ui/logo";
import { ModeToggle } from "shadcn/ui/mode-toggle";

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
const ActivityBar = (props: Props) => {
  return (
    <nav className="flex h-full w-fit justify-end  py-4  pl-4">
      <div className=" flex h-full w-[56px] flex-col items-center justify-between rounded-xl border border-border/60 bg-background p-2">
        <div className="flex h-fit w-full flex-col  items-center gap-6">
          <Logo size="md" noText />
          {TOPSEGMENTICONS.map((Icon) => {
            return (
              <Popover key={Icon.id}>
                <PopoverTrigger className="rounded-lg p-2 ">
                  <Icon.element className="text-muted-foreground hover:text-muted" />
                </PopoverTrigger>
                <PopoverContent>This is a popover</PopoverContent>
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
                <PopoverContent>This is a popover</PopoverContent>
              </Popover>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ActivityBar;
