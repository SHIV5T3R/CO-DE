import React, { useState, useRef, MouseEvent } from 'react';
import { Message } from '@/types/room';

import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { MoreHorizontal, Bell, X, Smile, ArrowRightCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/components/ui/avatar";
import Picker from '@emoji-mart/react';

interface Emoji {
  id: string,
  name: string,
  native: string,
  unified: string,
  keyword: string[],
  shortcodes: string,
  emotions: string[]
}

// Placeholder data. To be replaced with backend data
const MESSAGES: Message[] = [
  {
    _id: 'msg1',
    sender: 'KingXP-Pythoner' as string,
    content: 'Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?',
    sentAt: new Date(),
    readBy: [{_id: 'readby1', reader: 'reader', readAt: new Date()}],
    url: 'msg_url'
  },
  {
    _id: 'msg2',
    sender: 'Manasseh' as string,
    content: 'Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?',
    sentAt: new Date(),
    readBy: [{_id: 'readby1', reader: 'reader', readAt: new Date()}],
    url: 'msg_url'
  },
  {
    _id: 'msg1',
    sender: 'Shivster' as string,
    content: 'Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?',
    sentAt: new Date(),
    readBy: [{_id: 'readby1', reader: 'reader', readAt: new Date()}],
    url: 'msg_url'
  },
  {
    _id: 'msg1',
    sender: 'Shivster' as string,
    content: 'Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?',
    sentAt: new Date(),
    readBy: [{_id: 'readby1', reader: 'reader', readAt: new Date()}],
    url: 'msg_url'
  },
  {
    _id: 'msg1',
    sender: 'Shivster' as string,
    content: 'Hey everyone, I’ve been looking into the bug where the app crashes when trying to run the code. Any ideas?',
    sentAt: new Date(),
    readBy: [{_id: 'readby1', reader: 'reader', readAt: new Date()}],
    url: 'msg_url'
  },
]

export default function ChatBox() {
  const [input, setInput] = useState<string>('');
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const emojiBtnRef = useRef<SVGSVGElement>(null);

  function addEmoji(emoji: Emoji) {
    setInput(prev => prev + emoji.native);
    setShowPicker(false);
  }

  function hidePicker(e: MouseEvent) {
    if (emojiBtnRef.current) {
      const target = e.target as HTMLElement;
      // if clicked outside the picker, hide it
      if (target.className !== emojiBtnRef.current.className) {
        setShowPicker(false);
      }
    }
  }

  return (
    <section className="relative">
      <div className="flex justify-between mt-3">
        <p className="font-semibold">CO-DE Router Team</p>
        <div className="flex gap-2">
          <button className="hover:text-muted"><Bell /></button>
          <button className="hover:text-muted"><MoreHorizontal /></button>
          {/* Do we actually need the close button? */}
          <button className="hover:text-muted"><X /></button> 
        </div>
      </div>
      <ScrollArea className="h-[30vh] mt-4 p-1">
        <div>
          {MESSAGES.map((msg, index) => {
            return (
              <article key={index} className="mb-4">
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarImage src='' />
                    <AvatarFallback className="text-white dark:text-muted-foreground">{(msg.sender as string).substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-muted">{msg.sender as string}</p>
                    <p className="text-muted text-sm">{msg.content}</p>
                  </div>
                </div>
              </article>)
          })}
        </div>
      </ScrollArea>
      {/* chat input */}
      <div className="relative">
        <div className="bg-border-secondary absolute bottom-[110%] right-0">
          {showPicker && <Picker 
            onEmojiSelect={(emoji: Emoji) => addEmoji(emoji)} 
            previewPosition="none"
            searchPosition="none"
            emojiSize={16}
            emojiButtonSize={26}
            onClickOutside={(e: MouseEvent) => hidePicker(e)}
          />}
        </div>
        <div className="mt-5 w-full relative overflow-hidden p-3 min-h-[40px] max-h-[50px] rounded-full border-2 border-border/60">
          <textarea 
            className="w-[110%] max-w-[110%] h-full absolute left-0 right-4 bottom-0 overflow-y-auto break-words text-muted dark:text-white dark:bg-destructive-cancel py-2 px-4 pr-24 text-sm"
            placeholder="Type something here..." 
            cols={30}
            rows={2}
            value={input} 
            onChange={(e) => setInput(e.target.value)}   
          />
          <button className="absolute right-10 bottom-1.5 text-border/60 hover:text-muted">
            <Smile ref={emojiBtnRef} onClick={() => setShowPicker(!showPicker)} />
          </button>
          <button className="absolute right-2 bottom-1.5 text-border/60 hover:text-muted">
            <ArrowRightCircle />
          </button>
        </div> 
      </div>
    </section>
  )
}