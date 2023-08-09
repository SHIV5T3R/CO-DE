import { Project } from './project';
import { User, UserPermissions } from './user';

type Room = {
    title: string,
    description: string,
    owner: User,
    is_private: boolean|true,
    created_at: Date,
    invite_token: string
    project: Project,
    is_deleted: boolean|false
}

type RoomMessage = {
    room: Room,
    content: string,
    sent_by: User,
    created_at: Date,
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