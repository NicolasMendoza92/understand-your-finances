//  creamos este hook para comiunicarse con la db 
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

// traigo siempre la data del conectado. 
export const useGetCategories = () => {
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            // similar a axios pero no lo es... tenemos que capturar el error separado
            const response = await client.api.categories.$get();

            if(!response.ok) {
                throw new Error("Falied to fetch categories")
            }

            const { data } = await response.json();
            return data;
        }
    });
    return query;
}
