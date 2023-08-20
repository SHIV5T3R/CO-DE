import { User } from './user';

interface Project {
    _id: string,
    title: string,
    description: string,
    deletedAt: Date,
    isDeleted: boolean,
    directory: string,
    image: string
}

export { 
    type Project,
};