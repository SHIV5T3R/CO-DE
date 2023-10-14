import { useState } from "react";
import { Message } from "@/types/room";

import { ScrollAreaWithMask } from "@/shadcn/components/ui/scroll-area";
import { MoreHorizontal, Bell, X, Smile, ArrowRightCircle } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import Picker from "@emoji-mart/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/components/ui/tooltip";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useTheme } from "@/shadcn/components/ui/theme-provider";
import { Popover, PopoverTrigger } from "@/shadcn/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";

interface Emoji {
  id: string;
  name: string;
  native: string;
  unified: string;
  keyword: string[];
  shortcodes: string;
  emotions: string[];
}

// Placeholder data. To be replaced with backend data
const MESSAGES: Message[] = [
  {
    _id: "msg1",
    sender: "KingXP-Pythoner" as string,
    content:
      "Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?",
    sentAt: new Date(),
    readBy: [{ _id: "readby1", reader: "reader", readAt: new Date() }],
    url: "msg_url",
  },
  {
    _id: "msg2",
    sender: "Manasseh" as string,
    content:
      "Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?",
    sentAt: new Date(),
    readBy: [{ _id: "readby1", reader: "reader", readAt: new Date() }],
    url: "msg_url",
  },
  {
    _id: "msg1",
    sender: "Shivster" as string,
    content:
      "Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?",
    sentAt: new Date(),
    readBy: [{ _id: "readby1", reader: "reader", readAt: new Date() }],
    url: "msg_url",
  },
  {
    _id: "msg1",
    sender: "Shivster" as string,
    content:
      "Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?",
    sentAt: new Date(),
    readBy: [{ _id: "readby1", reader: "reader", readAt: new Date() }],
    url: "msg_url",
  },
  {
    _id: "msg1",
    sender: "Shivster" as string,
    content:
      "Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?",
    sentAt: new Date(),
    readBy: [{ _id: "readby1", reader: "reader", readAt: new Date() }],
    url: "msg_url",
  },
];

export default function ChatBox() {
  const { theme } = useTheme();
  const [input, setInput] = useState<string>("");

  function addEmoji(emoji: Emoji) {
    setInput((prev) => prev + emoji.native);
  }

  return (
    <section className="h-[60%] ">
      <div className="mt-3 flex justify-between">
        <p className="font-semibold">CO-DE Router Team</p>
        <div className="flex gap-2">
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <Bell className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>chat notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <MoreHorizontal className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>More</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Do we actually need the close button? */}
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <X />
              </TooltipTrigger>
              <TooltipContent>Close chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <ScrollAreaWithMask className="mt-4 h-[39vh] p-1">
        <div>
          {MESSAGES.map((msg, index) => {
            return (
              <article key={index} className="mb-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="text-white dark:text-muted-foreground">
                      {(msg.sender as string).substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-muted">
                      {msg.sender as string}
                    </p>
                    <p className="text-sm text-muted">{msg.content}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </ScrollAreaWithMask>
      {/* chat input */}
      <div className="relative">
        {/* <div className="relative mt-5 max-h-[50px] min-h-[40px] w-full overflow-hidden rounded-full border-2 border-border/60 p-3"> */}
        <div className="relative h-fit ">
          <Textarea
            className="max-h-[38px] min-h-[38px] w-full resize-none rounded-full border-2 border-border/60 pr-20 scrollbar-none hover:border-border/80 focus-visible:border-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type something here..."
            cols={30}
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Popover>
            <PopoverTrigger className="absolute inset-y-0 right-10 text-border/60 hover:text-muted">
              <Smile />
            </PopoverTrigger>
            <PopoverContent side="top">
              <Picker
                theme={theme}
                onEmojiSelect={(emoji: Emoji) => addEmoji(emoji)}
                previewPosition="none"
                searchPosition="none"
                emojiSize={16}
                emojiButtonSize={26}
              />
            </PopoverContent>
          </Popover>
          <button className="absolute inset-y-0 right-2 text-border/60 hover:text-muted">
            <ArrowRightCircle />
          </button>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
