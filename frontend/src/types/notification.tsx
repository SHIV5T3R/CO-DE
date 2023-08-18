import { User } from './user';

interface Notification {
    _id: string,
    title: string,
    content: string,
    receivers: string[]|User[],
    sender: string|User,
    type: NotificationType
}

enum NotificationType {
    NEW_MESSAGE,
    PROJECT_CHANGED,
    APPROVAL_REQUIRED,
    PROJECT_INVITE
}

export {
    type Notification,
    NotificationType
}