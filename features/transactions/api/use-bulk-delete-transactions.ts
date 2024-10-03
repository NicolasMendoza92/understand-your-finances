import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-delete"]["$post"]({json});
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transacciones borradas ");
      // esto es como un refecth cada vez que se crea una cuenta nueva
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    //   TODO: invalidar el resumen
    },
    onError: () => {
      toast.error("Falla al borrar las transacciones");
    },
  });

  return mutation;
};
