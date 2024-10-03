import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";


export const useConfirm = (
    title: string, 
    message: string, 
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: ( value: boolean) => void} | null>(null);

    const confirm = () => new Promise((resolve) => {
        setPromise({resolve})
    });

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose()
    };

    const ConfirmDialog = () => (
        <Dialog open ={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant={"outline"}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return[ ConfirmDialog, confirm]
}