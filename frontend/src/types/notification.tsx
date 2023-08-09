import { User } from './user';

type Notification = {
    title: string,
    content: string,
    for: User,
    generated_by: User,
    type: Notification_Type
}

enum Notification_Type {
    NEW_MESSAGE,
    PROJECT_CHANGED,
    APPROVAL_REQUIRED,
    PROJECT_INVITE
}

export {
    type Notification,
    Notification_Type
}