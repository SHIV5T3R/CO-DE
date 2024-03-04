import TerminalHeader from '../ui/terminalHeader'
import { ReactTerminal } from 'react-terminal'
import { useTheme } from '@/shadcn/components/ui/theme-provider';

const terminalThemes = {
  "tokyo-night-light": {
    themeBGColor: "hsl(var(--background))",
    themeToolbarColor: "hsl(var(--background))",
    themeColor: "hsl(var(--muted))",
    themePromptColor: "#a917a8"
  },
  "tokyo-night-storm": {
    themeBGColor: "hsl(var(--background))",
    themeToolbarColor: "hsl(var(--background))",
    themeColor: "hsl(var(--muted))",
    themePromptColor: "#a917a8"
  }
}

interface TerminalType {
  welcomeMessage: string,
  prompt?: string,
  commands?: any,
  errorMessage?: string,
  enableInput?: boolean,
  showControlBar: boolean,
  showControlButtons: boolean,
  theme: string,
  themes: any,
  defaultHandler: null
}

// None of the following commands are implemented yet! (aside from "help" and "clear")
const commands = {
  help: (
    <span>
      <strong>clear</strong> - clear the console. <br />
      <strong>None of the following commands are implemented yet!</strong>
      <strong>git_clone &lt;URL&gt;</strong> - retrieve a repo from a hosted location via URL. <br />
      <strong>git_add &lt;FILE&gt;</strong> - add a file as it looks now to next commit. <br />
      <strong>git_commit_m 'MESSAGE'</strong> - commit a change to repo with the MESSAGE. <br />
      <strong>git_push_origin &lt;BRANCH&gt;</strong> - push a change to repo BRANCH. <br />
      <strong>git_branch &lt;NAME&gt;</strong> - create a new branch. <br />
      <strong>git_checkout &lt;NAME&gt;</strong> - switch to NAME branch. <br />
      <strong>git_branch &lt;NAME&gt;</strong> - create a new branch. <br />
      <strong>ls</strong> - list files and directories. <br />
      <strong>cd &lt;DIRECTORY&gt;</strong> - change directory. <br />
      <strong>touch &lt;FILE_NAME&gt;</strong> - create a file. <br />
      <strong>rm &lt;FILE&gt;</strong> - remove file or directory. <br />
      <strong>mkdir &lt;DIR_NAME&gt;</strong> - create a new directory. <br />
    </span>
  ),
  git_clone: async (url: string) => {
    try {
      const response = await fetch(url);
      return `cloned ${url}`
    } catch (error) {
      return `Error: ${error}`;
    }
  },
  git_add: async (file: string) => {
    return `Files added`;
  },
  git_commit_m: async (message: string) => {
    return `Successful commit`;
  },
};

const welcomeMessage = <span>Type "help" for all available commands. <br /></span>;

export default function Terminal() {
  const { theme } = useTheme();

  return (
    <section className="h-full">
      <TerminalHeader />
      <ReactTerminal 
        commands={commands} 
        theme={
          theme === "light" ? "tokyo-night-light" : "tokyo-night-storm"
        }
        themes={terminalThemes}
        welcomeMessage={welcomeMessage}
        errorMessage="Unknown command"
        showControlBar={false}
      />
    </section>
  )
}