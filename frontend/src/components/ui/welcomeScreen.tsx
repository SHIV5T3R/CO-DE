import { Button } from "@/shadcn/components/ui/button";
import { Separator } from "@/shadcn/components/ui/separator";
import {
  FolderOpen,
  GitBranchPlus,
  PlusSquare,
  UserPlus,
  Users,
} from "lucide-react";

import CreateProject from "./dialogs/createProject";
import CreateRoom from "./dialogs/createRoom";
import JoinRoom from "./dialogs/joinExistingRoom";

type Props = {};

const WelcomeScreen = (props: Props) => {
  return (
    //   TODO - modify current shadcn button component with extra variant that accepts icon and provide styling that matches figma design for reusability and cleaner code here.
    <section className="flex max-w-5xl select-none flex-col gap-6 px-16 py-16">
      <h1 className="text-3xl font-bold text-muted">CO-DE</h1>
      <h2 className="text-lg">Your creative coding playground</h2>
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-muted-foreground">
          Start coding
        </h3>
        <Separator orientation="horizontal" />
        <div className="flex w-fit gap-4">
          <CreateProject>
            <Button className=" items-centerrounded-md flex w-fit  gap-2 border border-border/20 bg-muted-foreground/10 px-4 py-2 text-muted hover:bg-muted-foreground/30">
              <PlusSquare className="h-auto w-4" />
              New project
            </Button>
          </CreateProject>
          <Button className=" flex w-fit items-center gap-2 rounded-md border border-border/20 bg-muted-foreground/10 px-4 py-2 text-muted hover:bg-muted-foreground/30">
            <GitBranchPlus className="h-auto w-4" />
        <div className="flex w-fit flex-wrap gap-4">
          <Button variant={"secondary"}>
            <PlusSquare className="mr-2 h-auto w-4" />
            New project
          </Button>
          <Button variant={"secondary"}>
            <GitBranchPlus className="mr-2 h-auto w-4" />
            Open repository
          </Button>
          <Button variant={"secondary"}>
            <FolderOpen className="mr-2 h-auto w-4" />
            Open local folder
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-muted-foreground">Recents</h3>
        <Separator orientation="horizontal" />
        <span>No recent files/folders found</span>
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-muted-foreground">
          Collaboration
        </h3>
        <Separator orientation="horizontal" />
        <div className="flex w-fit gap-4">
          <CreateRoom>
            <Button className=" items-centerrounded-md flex w-fit  gap-2 border border-border/20 bg-muted-foreground/10 px-4 py-2 text-muted hover:bg-muted-foreground/30">
              <Users className="h-auto w-4" />
              Create room
            </Button>
          </CreateRoom>
          <JoinRoom>
            <Button className=" flex w-fit items-center gap-2 rounded-md border border-border/20 bg-muted-foreground/10 px-4 py-2 text-muted hover:bg-muted-foreground/30">
              <UserPlus className="h-auto w-4" />
              Join an existing room
            </Button>
          </JoinRoom>
        </div>
      </section>
    </section>
  );
};

export default WelcomeScreen;
