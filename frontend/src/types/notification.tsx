import { User } from "./user";

// Had to rename because "Notification" is already a built-in global object and causes conflicts when trying to import "Notification" type
interface RoomNotification {
  _id: string;
  title: string;
  content: string;
  receivers: string[] | User[];
  sender: string | User;
  type: NotificationType;
  isRead: boolean;
}

enum NotificationType {
  NEW_MESSAGE,
  PROJECT_CHANGED,
  APPROVAL_REQUIRED,
  PROJECT_INVITE,
}

export { NotificationType, type RoomNotification };
