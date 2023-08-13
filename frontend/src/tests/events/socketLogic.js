import io from 'socket.io-client';

export const setupSocketConnection = () => {
  const socket = io('http://localhost:5000');
  socket.on('connect', () => {
    console.log('Connected to server!')
  });
  return socket;
};
