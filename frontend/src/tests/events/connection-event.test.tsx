import { describe, it, expect, vi } from 'vitest';
import { setupSocketConnection, setupSocketDisconnection } from './socket-logic';

// Mock the socket methods 
vi.mock('socket.io-client', () => {
    const mockSocket = {
        on: vi.fn(),
        disconnect: vi.fn()
    };
    return {
        default: () => mockSocket
    };
});


// Get mocked implementation
import io from 'socket.io-client';
const mockSocket = io();

describe('Socket Logic', () => {
  it('should initiate socket connection', () => {
    setupSocketConnection();
    expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
  });

  it('should initiate socket disconnection', () => {
    setupSocketDisconnection();
    expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
  });
});
