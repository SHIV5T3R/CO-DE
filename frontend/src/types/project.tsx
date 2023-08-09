import { User, UserPermissions } from './user';

type Project = {
    title: string,
    owner: User,
    created_at: Date,
    is_deleted: boolean|false,
    is_private: boolean|true,
    invite_token: string,
    directory: string,
    image: string
}

type ProjectMember = {
    user: User,
    project: Project,
    permissions: UserPermissions
}

export { 
    type Project,
    type ProjectMember
};