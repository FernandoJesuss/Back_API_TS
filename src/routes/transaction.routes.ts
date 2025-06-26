import type { FastifyInstance } from "fastify";
import createTransaction from "../controller/transactions/createTransaction.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createTransactionSchema, getTransactionsSchema } from "../schemas/transaction.schema";
import { getTransactions } from "../controller/transactions/getTransactions.Controller";

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
};

export default transactionRoutes;
