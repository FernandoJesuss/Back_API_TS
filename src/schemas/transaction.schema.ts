import { z } from "zod";
import { ObjectId } from "mongodb";
import { TransactionType } from "../../generated/prisma";

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
	description: z.string().min(1, "Descrição obrigatoria"),
	amount: z.number().positive("Valor deve ser positivo"),
	date: z.coerce.date({
		errorMap: () => ({ message: "Data iválida" }),
	}),

	categoryId: z.string().refine(isValidObjectId, {
		message: "Categoria Inválida",
	}),
	type: z.enum([TransactionType.expense, TransactionType.income], {
		errorMap: () => ({ message: "Tipo de transação inválido" }),
	}),
});

export const getTransactionsSchema = z.object({
	month: z.string().optional(),
	year: z.string().optional(),
	type: z
		.enum([TransactionType.expense, TransactionType.income], {
			errorMap: () => ({ message: "Data inválida" }),
		})
		.optional(),
	categoryId: z
		.string()
		.refine(isValidObjectId, {
			message: "Categoria Inválida",
		})
		.optional(),
});

export const getTransactionsSummarySchema = z.object({
	month: z.string({message: "O mês é Obrigatório"}),
	year: z.string({message: "O ano é Obrigatório"}),
});

export const deleteTransactionSchema = z.object({
	id:z.string().refine(isValidObjectId, {
		message: "ID inválido",
	}),
})

export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>;

export type GetTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>;

export type deleteTransactionParams = z.infer<typeof deleteTransactionSchema>;