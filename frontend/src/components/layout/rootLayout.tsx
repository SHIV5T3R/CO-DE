import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "shadcn/ui/theme-provider";

const LOADING_MESSAGE = [
  "Load environment variables",
  "Load configuration",
  "Load database",
  "Load cache",
  "Load logger",
];
type Props = {};
function RootLayout(props: Props) {
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
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="co-de-ui-theme">
      <main className="h-screen w-full bg-background dark:bg-background">
        <div className="absolute bottom-5 right-3 z-50" />
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default RootLayout;
