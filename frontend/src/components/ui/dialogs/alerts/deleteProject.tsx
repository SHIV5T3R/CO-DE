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
  

export default function DeleteProject({ roomActive, children }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    {roomActive ? (
                        <p>
                            This will permanently delete the project from the server and close the current room.
                        </p>
                    ) : (
                        <p>
                            This will permanently delete the project from the server.
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
    )
}