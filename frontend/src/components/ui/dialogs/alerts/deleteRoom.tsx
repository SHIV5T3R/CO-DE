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
};

export default function DeleteRoom({ children }: BaseAlertProps) {
    return (
        <BaseAlert trigger={children} title="Are you sure?" titleStyle={{ color: "#2AC3DE" }} description="This will delete the room and kick everyone from it.">
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
                    This will delete the room and kick everyone from it.
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