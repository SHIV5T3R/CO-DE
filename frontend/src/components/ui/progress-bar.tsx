import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../../utils/lib";

const ProgressBarVariants = cva("loading", {
  variants: {
    size: {
      sm: ["h-1.5"],
      md: ["h-2"],
      lg: ["h-3"],
      xl: ["h-4"],
    },
    variant: {
      primary: ["bg-green-500"],
      secondary: ["bg-emerald-600"],
      success: ["bg-green-600"],
      danger: ["bg-red-500"],
      warning: ["bg-yellow-500"],
      info: ["bg-sky-500"],
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});
export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ProgressBarVariants> {
  progress?: number;
  determinate?: boolean;
}
function ProgressBar({
  progress = 0,
  determinate = false,
  size,
  variant,
  className,
}: ProgressBarProps) {
  return (
    <div
      className={cn(
        "mb-4 h-1.5 w-full rounded-full bg-gray-300 dark:bg-gray-700",
        ProgressBarVariants({ size }).replace(/\sbg-[a-z]+-\d+/, "")
        // remove the variant background-color from this div since that color is for the moving progress bar,
        // this div is just the background of it so we can see it move
      )}
    >
      <div
        aria-label="progress-bar"
        title="progress-bar"
        className={cn(
          ProgressBarVariants({ size, variant }),
          determinate && "animate-infinite animate-ease-in animate-pulse",
          "rounded-full transition-all ease-out",
          className
        )}
        style={{ width: determinate ? "100%" : `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
