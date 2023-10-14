import { useEffect, useState } from "react";
import useNotificationStore from "@/stores/useNotificationStore";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";
import RoomDetails from "../ui/roomDetails";
import ChatBox from "../ui/chatBox";
import NotificationTab from "../ui/notificationTab";

export default function RightSidebar() {
  const notifStore = useNotificationStore((state) => state.notifications);
  const [unreadNotifs, setUnreadNotifs] = useState(
    notifStore.filter((n) => n.isRead == false)
  );

  useEffect(() => {
    setUnreadNotifs(notifStore.filter((n) => n.isRead === false));
  }, [notifStore]);

  return (
    <section className="flex h-full flex-col items-center  p-2">
      <Tabs className="flex w-full flex-col items-center  " defaultValue="room">
        <TabsList className="bg-muted-foreground/10">
          <TabsTrigger
            className="font-semibold data-[state=active]:bg-muted data-[state=active]:text-background"
            value="room"
          >
            Room Details
          </TabsTrigger>
          <TabsTrigger
            className="flex items-center gap-1 font-semibold data-[state=active]:bg-muted data-[state=active]:text-background"
            value="notifications"
          >
            Notifications
            {unreadNotifs.length > 0 ? (
              <span className="rounded bg-rose-600 px-1 text-white">
                {unreadNotifs.length > 9 ? "9+" : unreadNotifs.length}
              </span>
            ) : (
              ""
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="room">
          <div className="flex h-full w-full flex-col justify-between">
            <RoomDetails />
            <ChatBox />
          </div>
        </TabsContent>
        <TabsContent className="w-full" value="notifications">
          {/* <div className="h-[400px] w-full  bg-yellow-200"></div> */}
          <NotificationTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
