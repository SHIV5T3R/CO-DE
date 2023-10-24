import useNotificationStore from "@/stores/useNotificationStore";

import { ScrollAreaWithMask } from "@/shadcn/components/ui/scroll-area";
import SingleNotification from "./singleNotification";
import { Button } from "@/shadcn/components/ui/button";

export default function NotificationTab() {
  const notifStore = useNotificationStore((state) => state.notifications);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);

  return (
    <section className="w-full  p-1">
      <div className="flex items-center justify-between">
        <h2>Notifications</h2>
        <Button variant={"secondary"} onClick={markAllAsRead}>
          Mark all as read
        </Button>
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
