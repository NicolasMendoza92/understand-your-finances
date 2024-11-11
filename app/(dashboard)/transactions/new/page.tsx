"use client"

import { z } from "zod";
import { insertTransactionSchema } from "@/db/schema";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Loader2 } from "lucide-react";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* eslint-disable @typescript-eslint/no-unused-vars */
const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const NewTransactionPage = () => {
  const router = useRouter();
  const mutation = useCreateTransaction();
  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });

  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    mutation.isPending || categoryMutation.isPending || accountMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push("/transactions"); // Redirige a la página de transacciones después de crear una transacción
      },
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Nueva Transacción
          </CardTitle>
        </CardHeader>
        <CardContent>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      ) : (
        <TransactionForm
          onSubmit={onSubmit}
          disabled={isPending}
          categoryOptions={categoryOptions}
          onCreateCategory={onCreateCategory}
          accountOptions={accountOptions}
          onCreateAccount={onCreateAccount}
        />
      )}
    </CardContent>
      </Card>
    </div>
  );
};

export default NewTransactionPage;
