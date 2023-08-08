import ProgressBar from './ui/progress-bar';

type LoadingPageProps = {
  message?: string;
  progress?: number;
};
function LoadingPage({ message, progress }: LoadingPageProps) {
  return (
    <div className="w-screen max-w-md">
      <img
        src={'/logo/main_logo.svg'}
        className="w-40 h-40 mx-auto mb-8 rounded-md shadow-md shadow-slate-600"
        alt="logo"
      />
      <ProgressBar progress={progress} />
      <p className="text-slate-500 text-sm text-center">{message}...</p>
    </div>
  );
}

export default LoadingPage;
