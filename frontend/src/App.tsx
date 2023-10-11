import React from "react";
import LoadingPage from "./components/loading";
import TestSocketConnectionComponent from "./tests/events/test-socket-connection-component";

import CreateProject from "./components/ui/dialogs/createProject";
import CreateRoom from "./components/ui/dialogs/createRoom";
import JoinRoom from "./components/ui/dialogs/joinExistingRoom";
import DeleteProject from "./components/ui/dialogs/alerts/deleteProject";
import DeleteRoom from "./components/ui/dialogs/alerts/deleteRoom";
import LeaveRoom from "./components/ui/dialogs/alerts/leaveRoom";
import ConnectionLost from "./components/ui/dialogs/alerts/connectionLost";
import FailedCreateProject from "./components/ui/dialogs/alerts/failedToCreateProject";
import FailedCreateRoom from "./components/ui/dialogs/alerts/failedCreateRoom";

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
      <LoadingPage progress={progress} message={message} />
      {/* <CodeEditor height={"100%"} fileExtension={".jsx"} /> */}
      <a href="/editor">Editor Page </a>
      <a href="/sign-up">Sign up Page </a>
      <a href="/sign-in">Sign in Page </a>
      <br></br>
      <CreateProject>
        <button style={{ 
                padding: '10px 20px', 
                fontSize: '16px', 
                border: '2px solid black', 
                cursor: 'pointer',
                transition: 'background-color 0.3s'
            }}>
          Create project dialog
        </button>
      </CreateProject>
      &nbsp;
      <CreateRoom>
        <button style={{ 
                  padding: '10px 20px', 
                  fontSize: '16px', 
                  border: '2px solid black', 
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
              }}>
            Create room dialog
        </button>
      </CreateRoom>
      &nbsp;
      <JoinRoom>
        <button style={{ 
                  padding: '10px 20px', 
                  fontSize: '16px', 
                  border: '2px solid black', 
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
              }}>
              Join room dialog
        </button>
      </JoinRoom>
      &nbsp;
      <DeleteProject roomActive={false}>
        <button style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    border: '2px solid black', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>
                Delete Project Dialog
        </button>
      </DeleteProject>
      &nbsp;
      <DeleteProject roomActive={true}>
        <button style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    border: '2px solid black', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>
                Delete Project Dialog (Room Active)
        </button>
      </DeleteProject>
      &nbsp;
      <DeleteRoom>
        <button style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    border: '2px solid black', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>
                Delete Room Dialog
        </button>
      </DeleteRoom>
      &nbsp;
      <LeaveRoom master={false}>
        <button style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    border: '2px solid black', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>
                Leave Room Dialog
        </button>
      </LeaveRoom>
      &nbsp;
      <LeaveRoom master={true}>
        <button style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    border: '2px solid black', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>
                Leave Room Dialog (Room Master)
        </button>
      </LeaveRoom>
      &nbsp;
      <ConnectionLost>
        <button style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    border: '2px solid black', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>
                Connection Lost Dialog
        </button>
      </ConnectionLost>
      &nbsp;
      <FailedCreateProject>
        <button style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    border: '2px solid black', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>
                Failed to create project
        </button>
      </FailedCreateProject>
      &nbsp;
      <FailedCreateRoom>
        <button style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    border: '2px solid black', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}>
                Failed to create project
        </button>
      </FailedCreateRoom>
    </div>
  );
}

export default App;
