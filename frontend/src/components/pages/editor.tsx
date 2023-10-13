import ActivityBar from "@/components/sections/activityBar";
import FileExplorerBar from "@/components/sections/fileExplorerBar";
import RightSectionContainer from "@/components/sections/rightSectionContainer";
import { useTheme } from "@/shadcn/components/ui/theme-provider";
import { Split, SplitProps } from "@geoffcox/react-splitter";
import Footer from "@/components/sections/footer";
type Props = {};

const splitterConfig: SplitProps = {
  minPrimarySize: "220px",
  minSecondarySize: "340px",
  initialPrimarySize: "20%",
};

const EditorPage = (props: Props) => {
  const { theme } = useTheme();

  return (
    <div className="h-screen text-muted-foreground">
      <section className=" flex h-[97%] w-full items-center ">
        <ActivityBar />
        <Split
          defaultSplitterColors={{
            color: theme === "dark" ? "#1F2335" : "#ecedf4",
            drag: "#c1cbf5",
            hover: "#687387",
          }}
          {...splitterConfig}
        >
          <FileExplorerBar />
          <RightSectionContainer />
        </Split>
      </section>
      <Footer />
    </div>
  );
};

export default EditorPage;