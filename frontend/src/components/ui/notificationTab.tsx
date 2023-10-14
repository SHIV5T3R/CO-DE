import useNotificationStore from "@/stores/useNotificationStore";

import { ScrollAreaWithMask } from "@/shadcn/components/ui/scroll-area";
import SingleNotification from "./singleNotification";

export default function NotificationTab() {
  const notifStore = useNotificationStore((state) => state.notifications);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);

  return (
    <section className="w-full  p-1">
      <div className="flex justify-between">
        <h2>Notifications</h2>
        <button
          className="rounded border border-border/20 bg-muted-foreground/10 p-1 text-xs text-muted transition-colors hover:bg-muted-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </div>
      <ScrollAreaWithMask className="my-4  h-[40vh] text-muted">
        {notifStore.map((notif, index) => {
          return (
            <SingleNotification
              key={notif._id}
              notif={notif}
              index={index}
              length={notifStore.length}
            />
          );
        })}
      </ScrollAreaWithMask>
    </section>
  );
}
