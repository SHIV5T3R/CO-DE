import React from "react";
import { Mode } from "./components/ui/logo";
import { Input } from "./shadcn/components/ui/input";

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
      // theme: mediaQueryList.matches ? "dark" : "light",
      theme: "dark", //we are setting this as dark for now until we have completed light themes naming
    });
    mediaQueryList.addEventListener("change", () => {
      setMode({
        // ...changes the theme if the user changes it on their device
        // theme: event.matches ? "dark" : "light",
        theme: "dark",
      });
    });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen bg-background dark:bg-background px-40">
      {/* <LoadingPage progress={progress} message={message} mode={mode} /> */}
      <Input />
    </main>
  );
}

export default App;
