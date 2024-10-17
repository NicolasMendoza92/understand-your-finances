//  creamos este hook para comiunicarse con la db
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMiliunitsAnto } from "@/lib/utils";


// traigo siempre la data del conectado.
export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      // similar a axios pero no lo es... tenemos que capturar el error separado
      const response = await client.api.summary.$get({
        query:{
            from, 
            to,
            accountId,
        }
      });

      if (!response.ok) {
        throw new Error("Falied to fetch summary");
      }

      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: convertAmountFromMiliunitsAnto(data.incomeAmount),
        expensesAmount: convertAmountFromMiliunitsAnto(data.expensesAmount),
        remainingAmount: convertAmountFromMiliunitsAnto(data.remainingAmount),
        categories: data.categories.map((category) => ({
            ...category,
            value: convertAmountFromMiliunitsAnto(category.value)
        })),
        days: data.days.map((day) => ({
            ...day,
            income: convertAmountFromMiliunitsAnto(day.income),
            expenses: convertAmountFromMiliunitsAnto(day.expenses),
        }))
      };
    },
  });
  return query;
};
