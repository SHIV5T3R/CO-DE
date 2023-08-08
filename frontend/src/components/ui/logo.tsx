import { cva } from 'class-variance-authority';
import { cn } from '../../utils/lib';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mode?: 'light' | 'dark'; //Todo: Extends for multiple theme
} & React.HTMLAttributes<HTMLImageElement>;

const LogoVariants = cva('loading', {
  variants: {
    size: {
      sm: ['h-18'],
      md: ['h-24'],
      lg: ['h-28'],
      xl: ['h-44'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function Logo({ size, className, mode, ...res }: Props) {
  return (
    <img
      src={mode === 'dark' ? '/logo/main_logo_dark.svg' : '/logo/main_logo.svg'}
      className={cn('w-auto', className, LogoVariants({ size }))}
      alt="logo"
      {...res}
    />
  );
}

export default Logo;
