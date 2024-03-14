/**
 * All socket logic testing could be added here
 */
import io from "socket.io-client";

export const setupSocketConnection = () => {
  const socket = io("http://localhost:5000");
  socket.on("connect", () => {
    console.log("Connected to server!");
  });
  return socket;
};

export const setupSocketDisconnection = () => {
  const socket = io("https://localhost:5000");

  socket.on("disconnect", () => {
    console.log("Disconnected from server!");
  });
};
