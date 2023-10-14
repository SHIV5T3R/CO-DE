import { Globe } from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex h-[3%] w-full items-center justify-end gap-1 border border-border-secondary bg-background px-4 ">
      <Globe className="h-auto w-4" />{" "}
      <span className="text-sm">
        Server status: <span className="text-sm text-success">Great</span>
      </span>
    </div>
  );
};

export default Footer;
