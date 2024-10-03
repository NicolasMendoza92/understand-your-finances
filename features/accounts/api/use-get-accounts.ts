//  creamos este hook para comiunicarse con la db 
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

// traigo siempre la data del conectado. 
export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            // similar a axios pero no lo es... tenemos que capturar el error separado
            const response = await client.api.accounts.$get();

            if(!response.ok) {
                throw new Error("Falied to fetch accounts")
            }

            const { data } = await response.json();
            return data;
        }
    });
    return query;
}
