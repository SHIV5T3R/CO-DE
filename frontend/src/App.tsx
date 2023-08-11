import React from "react";
import LoadingPage from "./components/loading";

import { ModeToggle } from "./shadcn/components/ui/mode-toggle";
import { ThemeProvider } from "@shadcn/ui/theme-provider";

const LOADING_MESSAGE = [
  "Load environment variables",
  "Load configuration",
  "Load database",
  "Load cache",
  "Load logger",
  "Load environment variables",
  "Load configuration",
  "Load database",
  "Load cache",
  "Load logger",
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
      setMessage(
        LOADING_MESSAGE[Math.floor(Math.random() * LOADING_MESSAGE.length)]
      );
      setMessage(
        LOADING_MESSAGE[Math.floor(Math.random() * LOADING_MESSAGE.length)]
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="co-de-ui-theme">
      <main className="flex flex-col items-center justify-center w-full h-screen bg-background dark:bg-background px-40">
        <div className="absolute right-3 top-3">
          <ModeToggle />
        </div>
        <LoadingPage progress={progress} message={message} />
      </main>
    </ThemeProvider>
  );
}

export default App;
