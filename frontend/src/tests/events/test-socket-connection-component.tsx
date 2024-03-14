import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const TestSocketConnectionComponent: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to the server!");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from the server!");
      });

      // Cleanup the effects when component is unmounted or when the socket object changes.
      return () => {
        socket.off("connect");
        socket.off("disconnect");
      };
    }
  }, [socket]);

  const handleConnectClick = () => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
  };

  const handleDisconnectClick = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "90px",
        paddingBottom: "40px",
      }}
    >
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          border: "2px solid black",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onClick={handleConnectClick}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
      >
        Connect
      </button>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          border: socket ? "2px solid black" : "2px solid gray",
          cursor: socket ? "pointer" : "not-allowed",
        }}
        onClick={handleDisconnectClick}
        disabled={!socket}
        onMouseOver={(e) => {
          if (socket) {
            e.currentTarget.style.backgroundColor = "#f0f0f0";
          }
        }}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
      >
        Disconnect
      </button>
    </div>
  );
};

export default TestSocketConnectionComponent;
