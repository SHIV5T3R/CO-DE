import { Project } from "./project";
import { User } from "./user";

interface Room {
  _id: string;
  title: string;
  description: string;
  owner: string | User;
  members: string[] | User[];
  isPrivate: boolean;
  project: string | Project;
  inviteToken: string;
}

interface RoomMessage {
  _id: string;
  room: string | Room;
  messages: string[] | Message[];
}

export interface Message {
  _id: string;
  sender: string | User;
  content: any; // For now.
  sentAt: Date;
  readBy: MessageReadBy[];
  url: string;
}

interface MessageReadBy {
  _id: string;
  reader: string | User;
  readAt: Date;
}

export { type Room, type RoomMessage };
