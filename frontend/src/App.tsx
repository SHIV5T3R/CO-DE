import { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { io } from 'socket.io-client';
import "./App.css"

function App() {
  const ydoc = useRef(new Y.Doc());
  const inputRef = useRef<HTMLInputElement | null>(null);
  const socket = io('http://127.0.0.1:5000');

  useEffect(() => {
    const ytext = ydoc.current.getText('shared');

    // Sync Yjs text with input value
    ytext.observe(() => {
      const ytextValue = ytext.toString();
      if (inputRef.current && inputRef.current.value !== ytextValue) {
        inputRef.current.value = ytextValue;
      }
    });

    // Listen to remote updates from the server
    socket.on('yjs-update', (update: Uint8Array) => {
      const byteArray = new Uint8Array(update);
      Y.applyUpdate(ydoc.current, byteArray);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleChange = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      const ytext = ydoc.current.getText('shared');
      const ytextValue = ytext.toString();
  
      if (inputValue !== ytextValue) {
        ytext.delete(0, ytext.length);
        ytext.insert(0, inputValue);
  
        // Send updates to the server
        socket.emit('yjs-update', Y.encodeStateAsUpdate(ydoc.current));
      }
    }
  };

  return (
    <>
      <h1>React Flask Yjs Boilerplate</h1>
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        style={{ width: '100%' }}
      />
    </>
  );
}

export default App;
