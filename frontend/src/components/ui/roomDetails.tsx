import React from 'react';
import { User } from '@/types/user';

import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/components/ui/avatar";
import { Room } from '@/types/room';

// Placeholder data. To be replaced with backend data 
const ROOM_MEMBERS: User[] = [
  {
    _id: 'KingXP-Pythoner',
    username: 'KingXP-Pythoner',
    fullName: 'KingXP-Pythoner',
    deletedAt: new Date,
    isDeleted: false,
    email: "example@email.com",
    password: '12345678',
    ghAccessKey: "ghaccesskey",
    ghRefreshKey: "ghrefreshkey",
    avatar: ''
  },
  {
    _id: 'Manasseh',
    username: 'Manasseh',
    fullName: 'Manasseh',
    deletedAt: new Date,
    isDeleted: false,
    email: "example@email.com",
    password: '12345678',
    ghAccessKey: "ghaccesskey",
    ghRefreshKey: "ghrefreshkey",
    avatar: ''
  },
  {
    _id: 'Mishap',
    username: 'Mishap',
    fullName: 'Mishap',
    deletedAt: new Date,
    isDeleted: false,
    email: "example@email.com",
    password: '12345678',
    ghAccessKey: "ghaccesskey",
    ghRefreshKey: "ghrefreshkey",
    avatar: ''
  },
  {
    _id: 'Shivster',
    username: 'Shivster',
    fullName: 'Shivster',
    deletedAt: new Date,
    isDeleted: false,
    email: "example@email.com",
    password: '12345678',
    ghAccessKey: "ghaccesskey",
    ghRefreshKey: "ghrefreshkey",
    avatar: ''
  },
  {
    _id: 'WTDawson',
    username: 'WTDawson',
    fullName: 'WTDawson',
    deletedAt: new Date,
    isDeleted: false,
    email: "example@email.com",
    password: '12345678',
    ghAccessKey: "ghaccesskey",
    ghRefreshKey: "ghrefreshkey",
    avatar: ''
  },
  {
    _id: 'J',
    username: 'J',
    fullName: 'J',
    deletedAt: new Date,
    isDeleted: false,
    email: "example@email.com",
    password: '12345678',
    ghAccessKey: "ghaccesskey",
    ghRefreshKey: "ghrefreshkey",
    avatar: ''
  },
  {
    _id: 'Obi',
    username: 'Obi',
    fullName: 'Obi',
    deletedAt: new Date,
    isDeleted: false,
    email: "example@email.com",
    password: '12345678',
    ghAccessKey: "ghaccesskey",
    ghRefreshKey: "ghrefreshkey",
    avatar: ''
  },
  {
    _id: 'David',
    username: 'David',
    fullName: 'David',
    deletedAt: new Date,
    isDeleted: false,
    email: "example@email.com",
    password: '12345678',
    ghAccessKey: "ghaccesskey",
    ghRefreshKey: "ghrefreshkey",
    avatar: ''
  }
];

const ROOM_DETAILS: Room = {
  _id: 'co-de',
  title: 'CO-DE Router Team',
  description: 'In this room, we will be working on the router repository, we’ll need to refactor the codebase and enforce TypeScript. Let’s communicate in this editor’s chat. Keep the chat up to date if you’re planning to do any major refactoring pls!',
  owner: 'Shivster',
  members: ROOM_MEMBERS,
  isPrivate: true,
  project: 'CO-DE Development',
  inviteToken: 'inviteToken'
}

export default function RoomDetails() {
  return (
    <ScrollArea className="h-[40vh] bg-border-secondary text-muted rounded-md p-4 border border-border/60 scroll-smooth">
      <h2 className="mb-3 text-lg font-semibold">Display Name: <span className="text-highlighted">{ROOM_DETAILS.title}</span></h2>
      <h2 className="mb-3 text-lg font-semibold">Project</h2>
      <p className="text-xs mb-1 font-semibold">Type: <span>GitHub repository</span></p>
      <p className="text-xs mb-1 font-semibold">Name: <span className="text-highlighted">{ROOM_DETAILS.project as string}</span></p>
      <p className="text-xs mb-1 font-semibold">Owner: <span className="text-highlighted">{ROOM_DETAILS.owner as string}</span></p>
      <p className="text-xs mb-1 font-semibold">Branch: <span className="text-highlighted">development</span></p>
      <h2 className="my-3 text-lg font-semibold">Room Description</h2>
      <p className="text-sm mb-1">{ROOM_DETAILS.description}</p>
      <h2 className="my-3 text-lg font-semibold">Room Members</h2>
      <div className="grid grid-cols-2 gap-3">
        {ROOM_MEMBERS.map(m => {
          return (
            <article key={m._id} className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={m.avatar} />
                <AvatarFallback className="text-xs text-white dark:text-muted-foreground">{m.username.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-xs">{m.username}</p>
            </article>
          )
        })}
      </div>
    </ScrollArea>
  )
}