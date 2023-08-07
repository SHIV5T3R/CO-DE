import React from 'react';
import LoadingProgressBar from './ui/loading-progress-bar';

const LOADING_MESSAGE = [
  'Load environment variables',
  'Load configuration',
  'Load database',
  'Load cache',
  'Load logger',
];
function LoadingPage() {
  const [progress, setProgress] = React.useState<number>(0);
  const [message, setMessage] = React.useState<string>(LOADING_MESSAGE[0]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(LOADING_MESSAGE[Math.floor(Math.random() * LOADING_MESSAGE.length)]);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-screen max-w-md">
      <img
        src={'/logo/main_logo.svg'}
        className="w-40 h-40 mx-auto mb-8 rounded-md shadow-md shadow-slate-600"
        alt="logo"
      />
      <LoadingProgressBar progress={progress} />
      <p className="text-slate-500 text-sm text-center">{message}...</p>
    </div>
  );
}

export default LoadingPage;
