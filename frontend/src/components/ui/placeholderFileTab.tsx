import Logo from "./logo";

type Props = {};

function PlaceholderFileTab(props: Props) {
  return (
    <div className="group flex h-full w-[224px] cursor-not-allowed select-none items-center justify-between border-x border-b border-accent border-x-border-secondary  px-3">
      <div className="flex w-fit items-center gap-2 ">
        <div className="h-full w-4">
          {" "}
          <Logo noText className="h-auto w-full " />
        </div>

        <span className="w-fit text-muted">Welcome!</span>
      </div>
    </div>
  );
}

export default PlaceholderFileTab;
