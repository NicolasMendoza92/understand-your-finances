import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import React from "react";

import { z } from "zod";
import { useCreateCategory } from "../api/use-create-category";
import { insertCategorySchema } from "@/db/schema";
import { CategoryForm } from "./category-form";
import { useNewCategory } from "../hooks/use-new-category";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
        onSuccess: () => {
            onClose()
        }
    })
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="spacey-y-4">
        <SheetHeader>
          <SheetTitle>Nueva Categoria</SheetTitle>
          <SheetDescription>
            Crea tu nueva categoria para dividir los gastos.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{
            name: "",
        }}/>
      </SheetContent>
    </Sheet>
  );
};
