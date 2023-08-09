import { cva } from 'class-variance-authority';
import { cn } from '../../utils/lib';

export type Mode = {
  theme?: 'dark' | 'light'; //Todo: Extends for multiple theme
}

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mode?: Mode
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
      src={mode?.theme === 'dark' ? '/logo/main_logo_dark.svg' : '/logo/main_logo.svg'}
      className={cn('w-auto', className, LogoVariants({ size }))}
      alt="logo"
      {...res}
    />
  );
}

export default Logo;

