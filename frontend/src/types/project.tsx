import { User } from './user';

type Project = {
    _id: string,
    title: string,
    description: string,
    deleted_at: Date,
    is_deleted: boolean,
    directory: string,
    image: string
}

export { 
    type Project,
};