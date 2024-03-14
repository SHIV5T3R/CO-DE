import { Bell, ClipboardCheck, FileUp, Mail, UserPlus } from "lucide-react";

import { Button } from "@/shadcn/components/ui/button";
import useNotificationStore from "@/stores/useNotificationStore";
import { RoomNotification } from "@/types/notification";

export default function SingleNotification({
  notif,
  index,
  length,
}: {
  notif: RoomNotification;
  index: number;
  length: number;
}) {
  const markAsReadStore = useNotificationStore((state) => state.markAsRead);

  let icon = <Bell />;
  let { content } = notif;
  if (notif.type === 0) {
    icon = <Mail />; // NEW_MESSAGE
    content += notif.sender;
  } else if (notif.type === 1) {
    icon = <FileUp />; // PROJECT_CHANGED
  } else if (notif.type === 2) {
    icon = <ClipboardCheck />; // APPROVAL_REQUIRED
  } else if (notif.type === 3) {
    icon = <UserPlus />; // PROJECT_INVITE
    content = notif.sender + content;
  }

  return (
    <article
      className={`my-1 mr-3 rounded px-3 transition-colors hover:bg-muted-foreground/20 focus:bg-muted-foreground/20 ${
        notif.isRead ? "bg-muted-foreground/10" : "bg-muted-foreground/30"
      }`}
      onMouseOver={() => markAsReadStore(notif._id)}
    >
      <div className="flex items-center gap-3  py-3">
        {icon}
        <div>
          <p className="text-sm">{content}</p>
          {notif.type === 3 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 rounded border border-border/50 px-5 py-0 text-sm "
            >
              Join
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
