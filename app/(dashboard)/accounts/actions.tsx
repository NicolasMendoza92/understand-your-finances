"use client";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/app/hooks/use-confirm";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm("Estas seguro?", "Estas por eliminar la cuenta");
  const deleteMutation = useDeleteAccount(id);
  const { onOpen } = useOpenAccount();
  const handleDelete = async () => {
    const ok = await confirm();
    if(ok){
        deleteMutation.mutate();
    }
  };
  return (
    <div>
        <ConfirmDialog/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
            <Trash className="size-4 mr-2" /> Borrar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};