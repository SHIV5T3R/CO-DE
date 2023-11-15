import {
    AlertDialogCancel
} from "@/shadcn/components/ui/alert-dialog"
import { Button } from "@/shadcn/components/ui/button"

import BaseAlert from "./baseAlert";

type BaseAlertProps = {
    children: React.ReactNode;
};

export default function FailedCreateProject({ children }: BaseAlertProps) {
    return (
        <BaseAlert trigger={children} title="Failed to create a project" titleStyle={{ color: "#F7768E" }} description="Something went wrong when you tried to create a project. Please try again later.">
            <div className="grid grid-cols-2 gap-2 w-full">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button className="w-full" style={{ backgroundColor : "#2AC3DE", color : "#1F2335" }}>Try again</Button>
            </div>
        </BaseAlert>
    );
}