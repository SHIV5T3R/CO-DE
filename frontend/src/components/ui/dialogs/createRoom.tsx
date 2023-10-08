import { Button } from "@/shadcn/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/shadcn/components/ui/dialog"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/components/ui/select"
import { FolderPlus, Github, Loader2 } from "lucide-react"
import { useState } from "react"

export default function CreateRoom({ children }) {
    const [ isLoading, setLoading ] = useState(false);
    
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle style={{ color: "#2AC3DE" }}>Create A Room Session</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="gap-5">
                        <Label htmlFor="roomName">Room name</Label>
                        <Input id="roomName" disabled={isLoading}></Input>
                    </div>
                    <div className="gap-5">
                        <div className="flex items-center justify-center">
                            <Label className="p-1">Choose project</Label>
                        </div>
                        <Select disabled={isLoading}>
                            <SelectTrigger className="w-full">
                                <Github></Github>
                                <Label>KingXP-Pythoner/</Label>
                            </SelectTrigger>
                            <SelectContent>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="gap-5">
                        <Label htmlFor="projectDescription">Description</Label>
                        <Input id="projectDescription" placeholder="Short description... (Max. 70 chars)" disabled={isLoading} maxLength={70}></Input>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex items-end justify-end">
                        <Button variant="cancel" className="dark:text-white light:text-black" disabled={isLoading}>Cancel</Button>&nbsp;
                        <Button variant="secondary" className="dark:text-black light:text-white" disabled={isLoading} onClick={() => { setLoading(true); }}>
                            {isLoading ? (
                                <p>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </p>
                            ) : <p>Continue</p>}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}