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
}