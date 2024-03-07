import { create } from "zustand";

import { NotificationType, RoomNotification } from "@/types/notification";

interface NotificationStore {
  notifications: RoomNotification[];
  markAsRead: (_id: string) => void;
  markAllAsRead: () => void;
}

const NOTIFICATIONS: RoomNotification[] = [
  {
    _id: "msg1",
    title: "New Message",
    content: "You've got a new message from ",
    receivers: [],
    sender: "Shivster",
    type: NotificationType.NEW_MESSAGE,
    isRead: false,
  },
  {
    _id: "upd1",
    title: "Project Changed",
    content: "tailwind.config.js has been changed",
    receivers: [],
    sender: "Manasseh",
    type: NotificationType.PROJECT_CHANGED,
    isRead: false,
  },
  {
    _id: "apr1",
    title: "Approval Required",
    content: "Approval required for index.css",
    receivers: [],
    sender: "Misha_p",
    type: NotificationType.APPROVAL_REQUIRED,
    isRead: false,
  },
  {
    _id: "inv1",
    title: "Project Invite",
    content: " invites you to join room SI-30",
    receivers: [],
    sender: "WTDawson",
    type: NotificationType.PROJECT_INVITE,
    isRead: false,
  },
  {
    _id: "upd2",
    title: "Project Changed",
    content: "tailwind.config.js has been changed",
    receivers: [],
    sender: "Manasseh",
    type: NotificationType.PROJECT_CHANGED,
    isRead: false,
  },
  {
    _id: "apr2",
    title: "Approval Required",
    content: "Approval required for index.css",
    receivers: [],
    sender: "Misha_p",
    type: NotificationType.APPROVAL_REQUIRED,
    isRead: false,
  },
  {
    _id: "inv2",
    title: "Project Invite",
    content: " invites you to join room SI-30",
    receivers: [],
    sender: "WTDawson",
    type: NotificationType.PROJECT_INVITE,
    isRead: false,
  },
];

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: NOTIFICATIONS,
  markAsRead: (_id: string) => {
    set((state: NotificationStore) => {
      const updatedNotifs = state.notifications.map((n) => {
        return n._id === _id ? { ...n, isRead: true } : n;
      });
      return { notifications: updatedNotifs };
    });
  },
  markAllAsRead() {
    set((state: NotificationStore) => {
      const updatedNotifs = state.notifications.map((n) => {
        return { ...n, isRead: true };
      });
      return { notifications: updatedNotifs };
    });
  },
}));

export default useNotificationStore;
