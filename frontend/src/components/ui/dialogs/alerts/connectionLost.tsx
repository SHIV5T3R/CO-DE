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

import BaseAlert from "./baseAlert";

type BaseAlertProps = {
    children: React.ReactNode;
};

export default function LeaveRoom({ children }: BaseAlertProps) {
    return (
        <BaseAlert trigger={children} title="Connection lost" titleStyle={{ color: "#F7768E" }} description="Your connection the the server has been lost. You may attempt to reconnect.">
            <Button className="w-full" style={{ backgroundColor : "#2AC3DE", color : "#1F2335" }}>Try again</Button>
        </BaseAlert>
    );

    /*return (
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
    )*/
}