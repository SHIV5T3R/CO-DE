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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { logout } from "@/services/auth/auth";
import { queryClient } from "../layout/rootLayout";
import { useQuery } from "@tanstack/react-query";

type Props = {};
const popoverContentPlaceholder = "This is a popover";
const TOPSEGMENTICONS: Array<{
  id: number;
  label: string;
  element: LucideIcon;
  content: React.ReactNode;
}> = [
  {
    id: 1,
    label: "menu",
    element: Menu,
    content: popoverContentPlaceholder,
  },
  {
    id: 2,
    label: "folders",
    element: Folders,
    content: popoverContentPlaceholder,
  },
  {
    id: 3,
    label: "fileSearch",
    element: FileSearch,
    content: popoverContentPlaceholder,
  },
  {
    id: 4,
    label: "gitFork",
    element: GitFork,
    content: popoverContentPlaceholder,
  },
  {
    id: 5,
    label: "github",
    element: Github,
    content: popoverContentPlaceholder,
  },
  {
    id: 6,
    label: "SquareDashedBottomCode",
    element: SquareDashedBottomCode,
    content: popoverContentPlaceholder,
  },
];

const BOTTOMSEGMENTICONS: Array<{
  id: number;
  label: string;

  element: LucideIcon;
  content: React.ReactNode;
}> = [
  { id: 1, label: "user", element: User, content: popoverContentPlaceholder },
  {
    id: 2,
    label: "settings",
    element: Settings,
    content: popoverContentPlaceholder,
  },
];
const ActivityBar = (props: Props) => {
  const { data } = useQuery<{ username?: string }>({
    queryKey: ["user-session"],
  });

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
                <PopoverContent side="right">{Icon.content}</PopoverContent>
              </Popover>
            );
          })}
        </div>

        <div className="flex h-fit w-full flex-col gap-6">
          <ModeToggle />
          {BOTTOMSEGMENTICONS.map((Icon) => {
            if (Icon.label === "user")
              return (
                <DropdownMenu key={Icon.id}>
                  <DropdownMenuTrigger className="rounded-lg p-2">
                    <Icon.element className="text-muted-foreground hover:text-muted" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right">
                    <DropdownMenuLabel>
                      Signed in as {data?.username}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        try {
                          await logout();
                          await queryClient.invalidateQueries({
                            queryKey: ["user-session"],
                          });
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                      className=" focus:hover:bg-destructive"
                    >
                      Sign out of editor
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
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
};

export default ActivityBar;
