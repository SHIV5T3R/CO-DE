import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useTheme } from "@shadcn/ui/theme-provider";

type Props = {
  size?: "sm" | "md" | "lg" | "xl";
} & React.HTMLAttributes<HTMLImageElement>;

const LogoVariants = cva("loading", {
  variants: {
    size: {
      sm: ["h-18"],
      md: ["h-24"],
      lg: ["h-28"],
      xl: ["h-44"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

function Logo({ size, className, ...res }: Props) {
  const { theme } = useTheme();
  
  return (
    <img
      src={
        theme === "dark" ? "/logo/main_logo_dark.svg" : "/logo/main_logo.svg"
      }
      className={cn("w-auto", className, LogoVariants({ size }))}
      alt="logo"
      {...res}
    />
  );
}

export default Logo;
