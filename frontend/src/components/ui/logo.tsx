import { cva } from "class-variance-authority";
import { cn } from "lib/utils";
import { useTheme } from "shadcn/ui/theme-provider";

type Props = {
  noText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
} & React.HTMLAttributes<HTMLImageElement>;

const LogoVariants = cva("loading", {
  variants: {
    size: {
      sm: ["w-18"],
      md: ["w-24"],
      lg: ["w-28"],
      xl: ["w-44"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

function Logo({ size, className, noText = false, ...res }: Props) {
  const { theme } = useTheme();

  return (
    <img
      src={
        noText
          ? "/logo/main_logo_notext.svg"
          : theme === "dark"
          ? "/logo/main_logo_dark.svg"
          : "/logo/main_logo.svg"
      }
      className={cn("h-auto", className, LogoVariants({ size }))}
      alt="logo"
      {...res}
    />
  );
}

export default Logo;
