import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog"
import { Button } from "@/shadcn/components/ui/button"
  

export default function LeaveRoom({ children }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle style={{ color: "#F7768E" }}>Connection lost</AlertDialogTitle>
                <AlertDialogDescription>
                    Your connection the the server has been lost. You may attempt to reconnect.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button className="w-full" style={{ backgroundColor : "#2AC3DE", color : "#1F2335" }}>Try again</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}