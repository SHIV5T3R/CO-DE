import { AlignCenter } from 'lucide-react';
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const TestSocketConnectionComponent: React.FC = () => {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to the server!');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div style={{paddingBottom : '50px'}}>
    <p><b>Backend server needs to be running, if you want to test socket connection.</b></p>
  </div>;
}

export default TestSocketConnectionComponent;
