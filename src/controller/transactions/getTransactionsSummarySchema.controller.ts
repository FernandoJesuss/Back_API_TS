import type { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsSummaryQuery } from "../../schemas/transaction.schema";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import prisma from "../../config/prisma";

dayjs.extend(utc);

export const getTransactionsSummary = async (
	request: FastifyRequest<{ Querystring: GetTransactionsSummaryQuery }>,
	reply: FastifyReply,
): Promise<void> => {
	const userId = "FED$%DF%RDF";

	if (!userId) {
		reply.status(401).send({ error: "Usuário não autenticado" });
		return;
	}

	const { month, year } = request.query;

	
	if (!month || !year) {
		reply.status(400).send({ error: "Mês e Ano são obrigatórios" });
		return;
	}

	const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
	const endDate = dayjs.utc(startDate).endOf("month").toDate();

	try {
		
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				date: {
					gte: startDate,
					lte: endDate,
				},
			},
			include: {
				Category: true,
			},
		});

		reply.send(transactions);
	} catch (err) {
		
		request.log.error("Erro ao buscar transações", err);
		reply.status(500).send({ error: "Erro do servidor" });
	}
};
