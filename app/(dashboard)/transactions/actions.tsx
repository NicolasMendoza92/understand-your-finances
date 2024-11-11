"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useConfirm } from "@/app/hooks/use-confirm";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
// import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm("Estas seguro?", "El movimiento sera eliminado");
  const deleteMutation = useDeleteTransaction(id);
  const router = useRouter(); // Define el router
  // const { onOpen } = useOpenTransaction();

  const handleDelete = async () => {
    const ok = await confirm();
    if(ok){
        deleteMutation.mutate();
    }
  };

  const handleEdit = () => {
    router.push(`/transactions/${id}/edit`); // Redirige a la página de edición
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
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleEdit}>
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
