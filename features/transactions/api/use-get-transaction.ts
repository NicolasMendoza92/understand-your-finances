//  creamos este hook para comiunicarse con la db 
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";

// traigo siempre la data del conectado. 
export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["transaction", { id }],
        queryFn: async () => {
            // similar a axios pero no lo es... tenemos que capturar el error separado
            const response = await client.api.transactions[":id"].$get({
                param: { id }
            });

            if(!response.ok) {
                throw new Error("Falied to fetch transaction")
            }

            const { data } = await response.json();
            return {
                ...data,
                amount: convertAmountFromMiliunits(data.amount)
            }
        }
    });
    return query;
}
