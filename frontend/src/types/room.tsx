import { Project } from './project';
import { User } from './user';

type Room = {
    _id: string,
    title: string,
    description: string,
    owner: (string|User),
    members: string[]|User[],
    isPrivate: boolean,
    project: string|Project,
    inviteToken: string
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
    sentAt: Date,
    readBy: MessageReadBy[],
    url: string
}

type MessageReadBy = {
    _id: string,
    reader: string|User,
    readAt: Date
}

export {
    type Room,
    type RoomMessage,
};