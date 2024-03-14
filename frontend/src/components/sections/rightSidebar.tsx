import { useEffect, useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";
import useNotificationStore from "@/stores/useNotificationStore";

import ChatBox from "../ui/chatBox";
import NotificationTab from "../ui/notificationTab";
import RoomDetails from "../ui/roomDetails";

export default function RightSidebar() {
  const notifStore = useNotificationStore((state) => state.notifications);
  const [unreadNotifs, setUnreadNotifs] = useState(
    notifStore.filter((n) => n.isRead == false)
  );

  useEffect(() => {
    setUnreadNotifs(notifStore.filter((n) => n.isRead === false));
  }, [notifStore]);

  return (
    <section className="h-full  p-2">
      <Tabs
        className="flex  h-[calc(100vh-128px)] w-full flex-col items-center    "
        defaultValue="room"
      >
        <TabsList className="h-fit  bg-muted-foreground/10">
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
        <TabsContent
          className="flex h-full  flex-col justify-between data-[state=inactive]:hidden  "
          value="room"
        >
          <div className="h-[40%] w-full ">
            <RoomDetails />
          </div>
          <div className="h-[59%] w-full ">
            {/* <RoomDetails /> */}
            <ChatBox />
          </div>
        </TabsContent>
        <TabsContent
          className="flex  w-full data-[state=inactive]:hidden"
          value="notifications"
        >
          <NotificationTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
