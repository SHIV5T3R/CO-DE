import React, { useEffect, useState } from 'react';
import useNotificationStore from '@/stores/useNotificationStore';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import RoomDetails from '../ui/roomDetails';
import ChatBox from '../ui/chatBox';
import NotificationTab from '../ui/notificationTab';
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export default function RightSidebar() {
  const notifStore = useNotificationStore(state => state.notifications);
  const [unreadNotifs, setUnreadNotifs] = useState(notifStore.filter(n => n.isRead == false));
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setUnreadNotifs(notifStore.filter(n => n.isRead === false));
  }, [notifStore])

  return (
    <section className={`${isCollapsed ? 'w-20' : 'w-2/5'} flex flex-col items-center h-full p-2 border-l border-border/60 transition-all`}>
      {isCollapsed ? (
          <button className="text-muted-foreground hover:text-muted" onClick={() => setIsCollapsed(!isCollapsed)}>
            <PanelRightOpen />
          </button> 
        ) : (
          <Tabs className="w-full flex flex-col items-center" defaultValue="room">
            <div className="w-full">
              <button className="text-muted-foreground hover:text-muted" onClick={() => setIsCollapsed(!isCollapsed)}><PanelRightClose /></button>
            </div>
            <TabsList className="bg-muted-foreground/10">
              <TabsTrigger className="font-semibold data-[state=active]:bg-muted data-[state=active]:text-background" value="room">Room Details</TabsTrigger>
              <TabsTrigger className="font-semibold data-[state=active]:bg-muted data-[state=active]:text-background flex items-center gap-1" value="notifications">Notifications  
                {unreadNotifs.length > 0 
                  ? <span className="bg-rose-600 text-white px-1 rounded">{unreadNotifs.length > 9 ? '9+' : unreadNotifs.length}</span>
                  : ''}
              </TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col" value="room">
              <RoomDetails />
              <ChatBox />
            </TabsContent>

            <TabsContent className="w-full" value="notifications">
              <NotificationTab />
            </TabsContent>
          </Tabs>
        )}
    </section>
  )
}