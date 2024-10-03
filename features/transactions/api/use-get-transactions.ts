//  creamos este hook para comiunicarse con la db
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMiliunits } from "@/lib/utils";

// traigo siempre la data del conectado.
export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      // similar a axios pero no lo es... tenemos que capturar el error separado
      const response = await client.api.transactions.$get({
        query:{
            from, 
            to,
            accountId,
        }
      });

      if (!response.ok) {
        throw new Error("Falied to fetch transactions");
      }

      const { data } = await response.json();
      return data.map((transaction) => ({
        ...transaction,
        amount:convertAmountFromMiliunits(transaction.amount)
      }));
    },
  });
  return query;
};
