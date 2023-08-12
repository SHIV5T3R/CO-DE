import { Project } from './project';
import { User } from './user';

type Room = {
    _id: string,
    title: string,
    description: string,
    owner: (string|User),
    members: string[]|User[],
    is_private: boolean,
    project: string|Project,
    invite_token: string
}

type RoomMessage = {
    _id: string,
    room: string|Room,
    messages: string[]|Message[]
}

type Message = {
    _id: string,
    sender: string|User,
    content: any, // For now.
    sent_at: Date,
    read_by: MessageReadBy[],
    url: string
}

type MessageReadBy = {
    _id: string,
    reader: string|User,
    read_at: Date
}

export {
    type Room,
    type RoomMessage,
};