import { z } from "zod";
import { ObjectId } from "mongodb";
import { TransactionType } from '../../generated/prisma'

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
	description: z.string().min(1, "Descrição obrigatoria"),
	amount: z.number().positive("Valor deve ser positivo"),
	date: z.coerce.date({
		errorMap: () => ({ message: "Data iválida" }),
	}),

    categoryId: z.string().refine (isValidObjectId, {
        message: "Data Inválida",
    }),
    	type: z.enum([TransactionType.expense, TransactionType.income], {
		errorMap: () => ({ message: "Tipo de transação inválido" }),
    })
});

