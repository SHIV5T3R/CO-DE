import Logo from './ui/logo';
import ProgressBar from './ui/progress-bar';

type LoadingPageProps = {
  message?: string;
  progress?: number;
};
function LoadingPage({ message, progress }: LoadingPageProps) {
  return (
    <div className="w-screen max-w-md">
      <Logo className="mx-auto mb-8 rounded-md " mode={'dark'} />
      <ProgressBar progress={progress} />
      <p className="text-slate-500 text-sm text-center">{message}...</p>
    </div>
  );
}

export default LoadingPage;
