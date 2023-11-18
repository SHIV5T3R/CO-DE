import ExplorerTreeView from "../ui/explorerTreeView";

// import {fileExplorerMockFiles} from '@/mocks/file-explorer.mock.files'
function FileExplorerBar(): JSX.Element {
  return (
    <div className="relative h-full w-full min-w-[220px] select-none  bg-background px-1 py-8">
      <ExplorerTreeView />
    </div>
  );
}

export default FileExplorerBar;
