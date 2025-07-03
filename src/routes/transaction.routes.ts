import type { FastifyInstance } from "fastify";
import createTransaction from "../controller/transactions/createTransaction.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createTransactionSchema, deleteTransactionSchema, getTransactionsSchema, getTransactionsSummarySchema } from "../schemas/transaction.schema";
import { getTransactions } from "../controller/transactions/getTransactions.Controller";
import { getTransactionsSummary } from "../controller/transactions/getTransactionsSummarySchema.controller";
import { deleteTransaction } from "../controller/transactions/deleteTransaction.controller";

const transactionRoutes = async (fastify: FastifyInstance) => {
	//Criação
	fastify.route({
		method: "POST",
		url: "/",

		schema: {
			body: zodToJsonSchema(createTransactionSchema),
		},

		handler: createTransaction,
	});

	//Buscar com Filtro
	fastify.route({
		method: "GET",
		url: "/",
        schema: {
            querystring: zodToJsonSchema(getTransactionsSchema)
        },
         handler: getTransactions,
	});

	//Busca o resumo
	fastify.route({
		method: "GET",
		url: "/Summary",
		schema: {
			querystring: zodToJsonSchema(getTransactionsSummarySchema),
		},
		handler: getTransactionsSummary

	});

		//Delte
	fastify.route({
		method: "DELETE",
		url: "/:id",
		schema: {
			params: zodToJsonSchema(deleteTransactionSchema),
		},
		handler: deleteTransaction,
	});
};

export default transactionRoutes;
