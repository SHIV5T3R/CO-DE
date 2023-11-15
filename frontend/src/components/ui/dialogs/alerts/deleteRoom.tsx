import {
    AlertDialogAction,
    AlertDialogCancel
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
}