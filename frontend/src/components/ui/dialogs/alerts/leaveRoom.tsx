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

import BaseAlert from "./baseAlert";

type BaseAlertProps = {
    children: React.ReactNode;
    master: boolean
};

export default function LeaveRoom({ master, children }: BaseAlertProps) {
    return (
        <BaseAlert trigger={children} title="Are you sure?" titleStyle={{ color: "#2AC3DE" }} description={master ? "This will delete the room." : "You will leave the room and you will not be able to come back in unless someone invites you."}>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
        </BaseAlert>
    );

    /*return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle style={{ color: "#2AC3DE" }}>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    {master ? (
                        <p>
                            This will delete the room.
                        </p>
                    ) : (
                        <p>
                            You will leave the room and you will not be able to come back in unless someone invites you.
                        </p>
                    )}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )*/
}