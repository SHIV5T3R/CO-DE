import {
    AlertDialogAction,
    AlertDialogCancel
} from "@/shadcn/components/ui/alert-dialog"

import BaseAlert from "./baseAlert";

type BaseAlertProps = {
    children: React.ReactNode;
    roomActive: boolean
};

export default function DeleteProject({ roomActive, children }: BaseAlertProps) {
    return (
        <BaseAlert
        trigger={children} title="Are you sure?"
        titleStyle={{ color: "#2AC3DE" }}
        description={roomActive ? "This will permanently delete the project from the server and close the current room." : "This will permanently delete the project from the server."}>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
        </BaseAlert>
    );
}