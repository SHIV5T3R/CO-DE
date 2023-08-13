import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

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
      success: ["bg-success"],
      danger: ["bg-danger"],
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
        "w-full bg-foreground rounded-full h-1.5 mb-4 dark:bg-foreground",
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
          determinate && "animate-pulse animate-infinite animate-ease-in",
          "rounded-full transition-all ease-out",
          className
        )}
        style={{ width: determinate ? '100%' : `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
