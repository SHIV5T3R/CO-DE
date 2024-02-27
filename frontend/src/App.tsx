import React from "react";
import LoadingPage from "./components/loading";
import TestSocketConnectionComponent from "./tests/events/test-socket-connection-component";

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

  // const commands = {
  //   'npm': {
  //     'install': async (baseUrl, package) => {
  //       console.log('Running npm install...');
  //       // Send post request to execute the command
  //       const req = await fetch(`${baseUrl}/npm/install/${package}`)
  //       const res = await req.json();
  //       console.log(res);
  //     },
  //   }
  // }

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
    <div className="m-auto w-full">
      <TestSocketConnectionComponent />{" "}
      {/* Just for testing socket connection from client-side, can remove when more pages are made */}
      {/* <LoadingPage progress={progress} message={message} /> */}
      {/* <CodeEditor height={"100%"} fileExtension={".jsx"} /> */}
      <a href="/editor">Editor Page </a>
      <a href="/sign-up">Sign up Page </a>
      <a href="/sign-in">Sign in Page </a>
    </div>
  );
}

export default App;
