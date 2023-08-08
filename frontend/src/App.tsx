import React from 'react';
import LoadingPage from './components/loading';

const LOADING_MESSAGE = [
  'Load environment variables',
  'Load configuration',
  'Load database',
  'Load cache',
  'Load logger',
];
function App() {
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
    <main className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 dark:bg-gray-900 px-40">
      <LoadingPage progress={progress} message={message} />
    </main>
  );
}

export default App;
