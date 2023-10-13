import { Globe } from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex h-[3%] w-full justify-end items-center gap-2 border border-border-secondary bg-background px-4 ">
      <Globe className="h-auto w-4" />{" "}
      <span>
        Server status <span className="text-success">Great</span>
      </span>
    </div>
  );
};

export default Footer;
