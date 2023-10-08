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
  

export default function FailedCreateRoom({ children }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle style={{ color: "#F7768E" }}>Failed to create a room</AlertDialogTitle>
                <AlertDialogDescription>
                    Something went wrong when you tried to create a room. Please try again later.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button className="w-full" style={{ backgroundColor : "#2AC3DE", color : "#1F2335" }}>Try again</Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}