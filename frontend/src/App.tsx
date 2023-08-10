import React from "react";
import LoadingPage from "./components/loading";
import { Mode } from "./components/ui/logo";

const LOADING_MESSAGE = [
  "Load environment variables",
  "Load configuration",
  "Load database",
  "Load cache",
  "Load logger",
];
function App() {
  const [progress, setProgress] = React.useState<number>(0);
  const [message, setMessage] = React.useState<string>(LOADING_MESSAGE[0]);
  // mode should be part of the app context/Redux store or whatever state management
  // is going to be used since it should be available to all components of the app if they need it
  const [mode, setMode] = React.useState<Mode>();

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
      setMessage(
        LOADING_MESSAGE[Math.floor(Math.random() * LOADING_MESSAGE.length)]
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    // for now we only implemented dark and light themes so this should be sufficient

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    setMode({
      // sets the theme on load...
      theme: mediaQueryList.matches ? "dark" : "light",
    });
    mediaQueryList.addEventListener("change", (event) => {
      setMode({
        // ...changes the theme if the user changes it on their device
        theme: event.matches ? "dark" : "light",
      });
    });
  }, []);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-40 dark:bg-gray-900">
      <LoadingPage progress={progress} message={message} mode={mode} />
    </main>
  );
}

export default App;
