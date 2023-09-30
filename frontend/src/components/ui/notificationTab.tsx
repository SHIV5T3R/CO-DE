import React from 'react';
import useNotificationStore from '@/stores/useNotificationStore';

import { ScrollArea } from '@/shadcn/components/ui/scroll-area';
import SingleNotification from './singleNotification';

export default function NotificationTab() {
  const notifStore = useNotificationStore(state => state.notifications);
  const markAllAsRead = useNotificationStore(state => state.markAllAsRead);

  return (
    <section className="w-full p-1">
      <div className="flex justify-between">
        <h2>Notifications</h2>
        <button className="border border-border/20 bg-muted-foreground/10 text-muted text-xs p-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted-foreground/30"
          onClick={markAllAsRead}
        >Mark all as read</button>
      </div>
      <ScrollArea className="h-[40vh] text-muted my-4">
        {notifStore.map((notif, index) => {
          return <SingleNotification key={notif._id} notif={notif} index={index} length={notifStore.length} />
        })}
      </ScrollArea>
    </section>
  )
}