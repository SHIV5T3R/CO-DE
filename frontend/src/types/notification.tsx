import { User } from './user';

type Notification = {
    title: string,
    content: string,
    for: User,
    generated_by: User,
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