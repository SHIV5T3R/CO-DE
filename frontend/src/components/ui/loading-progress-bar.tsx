import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/lib';

const loadingVariants = cva('loading', {
  variants: {
    size: {
      sm: ['h-1.5'],
      md: ['h-2'],
      lg: ['h-3'],
      xl: ['h-4'],
    },
    variant: {
      primary: ['bg-green-500'],
      secondary: ['bg-secondary-500'],
      success: ['bg-success-500'],
      danger: ['bg-danger-500'],
      warning: ['bg-warning-500'],
      info: ['bg-info-500'],
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});
export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingVariants> {
  progress?: number;
  determinate?: boolean;
}
function LoadingProgressBar({ progress = 0, determinate = false, size, variant, className }: LoadingProps) {
  return (
    <div className={cn('w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700', loadingVariants({ size }))}>
      <div
        className={cn(
          loadingVariants({ size, variant }),
          determinate && 'animate-pulse animate-infinite animate-ease-in',
          'rounded-full transition-all ease-out',
          className
        )}
        style={{ width: determinate ? '100%' : `${progress}%` }}
      />
    </div>
  );
}

export default LoadingProgressBar;
