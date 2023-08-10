import { User, UserPermissions } from './user';

type Project = {
    title: string,
    owner: User,
    createdAt: Date,
    isDeleted: boolean|false,
    isPrivate: boolean|true,
    inviteToken: string,
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