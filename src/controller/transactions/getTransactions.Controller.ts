import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionsQuery } from "./../../schemas/transaction.schema";
import { TransactionFilter } from "../../types/transaction.type";

// Configurar o plugin UTC do dayjs
dayjs.extend(utc);

export const getTransactions = async (
	request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
	reply: FastifyReply,
): Promise<void> => {
	const userId = "FED$%DF%RDF";

	if (!userId) {
		reply.status(401).send({ error: "Usuário não autenticado " });
	}

	const { month, categoryId, year, type } = request.query;

	const filters: TransactionFilter = { userId };

	if (month && year) {
		const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
		const endDate = dayjs.utc(startDate).endOf("month").toDate();

		filters.date = { gte: startDate, lte: endDate };
	}

	if (categoryId) {
		filters.categoryId = categoryId;
	}

	if (type) {
		filters.type = type;
	}

	try {
		const transactions = await prisma.transaction.findMany({
			where: filters,
			orderBy: { date: "desc" },
			include: {
				Category: {
					select: {
						color: true,
						name: true,
						type: true,
					},
				},
			},
		});

		reply.send(transactions);

		
	} catch (err) {
		console.error("Erro ao buscar transações:", err);
		reply.status(500).send({
			error: "Erro interno do servidor",
		});
	}
};


