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
} from "@/shadcn/components/ui/alert-dialog";


type BaseAlertProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    title: string;
    titleStyle: React.CSSProperties;
    description: string;
};

export default function BaseAlert({
    trigger,
    children,
    title,
    titleStyle,
    description,
  }: BaseAlertProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle style={titleStyle}>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {children}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}