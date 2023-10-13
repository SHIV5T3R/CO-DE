import React from 'react';
import { RoomNotification } from '@/types/notification';
import useNotificationStore from '@/stores/useNotificationStore';

import { Mail, ClipboardCheck, FileUp, UserPlus, Bell } from "lucide-react";

export default function SingleNotification({ notif, index, length }: { notif: RoomNotification, index: number, length: number }) {
  const markAsReadStore = useNotificationStore(state => state.markAsRead);

  let icon = <Bell />;
  let content = notif.content;
  if (notif.type === 0) {
    icon = <Mail />; // NEW_MESSAGE
    content += notif.sender;
  } else if (notif.type === 1) {
    icon = <FileUp />; // PROJECT_CHANGED
  } else if (notif.type === 2) {
    icon = <ClipboardCheck />; // APPROVAL_REQUIRED
  } else if (notif.type === 3) {
    icon = <UserPlus />; //PROJECT_INVITE
    content = notif.sender + content
  }

  return (
    <article 
      className={`px-1 rounded hover:bg-muted-foreground/30 transition-colors ${notif.isRead ? 'bg-muted-foreground/10' : 'bg-muted-foreground/30'}`}
      onMouseOver={() => markAsReadStore(notif._id)}
    >
      <div className="flex gap-3 items-center py-3">
        {icon}
        <div>
          <p className="text-sm">{content}</p>
          {notif.type === 3 && <button className="bg-accent hover:bg-accent/70 text-white py-1 px-5 mt-1 text-sm rounded border border-border/20">Join</button>}
        </div>
      </div>
      {index < length - 1 
        ? <div className="w-11/12 h-px bg-border/10 mx-auto" />
        : ''}
    </article>)
}