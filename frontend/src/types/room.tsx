import { Project } from './project';
import { User, UserPermissions } from './user';

type Room = {
    title: string,
    description: string,
    owner: User,
    isPrivate: boolean|true,
    createdAt: Date,
    inviteToken: string
    project: Project,
    isDeleted: boolean|false
}

type RoomMessage = {
    room: Room,
    content: string,
    sentBy: User,
    createdAt: Date,
    file: string
}

type RoomMember = {
    user: User,
    permissions: UserPermissions,
    has_left: boolean|false
}

export {
    type Room,
    type RoomMessage,
    type RoomMember
};