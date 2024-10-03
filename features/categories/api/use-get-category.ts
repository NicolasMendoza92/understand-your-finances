//  creamos este hook para comiunicarse con la db 
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

// traigo siempre la data del conectado. 
export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["category", { id }],
        queryFn: async () => {
            // similar a axios pero no lo es... tenemos que capturar el error separado
            const response = await client.api.categories[":id"].$get({
                param: { id }
            });

            if(!response.ok) {
                throw new Error("Falied to fetch category")
            }

            const { data } = await response.json();
            return data;
        }
    });
    return query;
}
