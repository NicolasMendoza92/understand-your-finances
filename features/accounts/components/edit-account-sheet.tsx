import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import React from "react";

import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/app/hooks/use-confirm";

const formSchema = insertAccountSchema.pick({
  name: true,
});


type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const [ConfrimDialog, confirm] = useConfirm(
    "Estas Seguro?",
    "Vas a borrar la cuenta"
  )

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id)

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if(ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };
  return (
    <>
    <ConfrimDialog/>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="spacey-y-4">
        <SheetHeader>
          <SheetTitle>Edita tu Cuenta</SheetTitle>
          <SheetDescription>
            Edita la cuenta existente
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 justify-center items-center">
            <Loader2 className="animate-spin size-4 text-mueted-foreground" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={defaultValues}
            onDelete={onDelete}
          />
        )}
      </SheetContent>
    </Sheet>
    </>
    
  );
};
