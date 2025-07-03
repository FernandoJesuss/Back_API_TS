
// import type { FastifyReply, FastifyRequest } from "fastify";
// import type { deleteTransactionParams } from "../../schemas/transaction.schema";
// import prisma from '../../config/prisma';

// export const deleteTransaction = async (
//     request: FastifyRequest<{ Params: deleteTransactionParams }>,
//     reply: FastifyReply
// ): Promise<void> => {

//     const userId = "FED$DF%RDF";
//     const { id } = request.params;

// 	if (!userId) {
// 		reply.status(401).send({ error: "Usuário não autenticado" });
// 		return;
// 	}

//     try {
//         const Transaction = await prisma.transaction.findFirst({
//             where: {
//             id, userId,
//             }
//         });

        
// 	if (!transaction) {
// 		reply.status(400).send({ error: "ID da transaçao inválido" });
// 		return;
//     }

//     await prisma.transaction.delete({where: {id}});

//     reply.status(200).send({ message:"Transação deletada com sucesso"});
//     } catch (err) {
//         request.log.error({ message: "Erro ao deleta transação "})
//         reply.status(500).send({ error: " Erro interno de servidor, falha ao deletar transação "})
//     }


// };




import type { FastifyReply, FastifyRequest } from "fastify";
import type { deleteTransactionParams } from "../../schemas/transaction.schema";
import prisma from '../../config/prisma';

export const deleteTransaction = async (
    request: FastifyRequest<{ Params: deleteTransactionParams }>,
    reply: FastifyReply
): Promise<void> => {

    const userId = "FED$DF%RDF";
    const { id } = request.params;

	if (!userId) {
		reply.status(401).send({ error: "Usuário não autenticado" });
		return;
	}

    try {
        const transaction = await prisma.transaction.findFirst({
            where: {
                id, 
                userId,
            }
        });

        if (!transaction) {
            reply.status(404).send({ error: "Transação não encontrada" });
            return;
        }

        await prisma.transaction.delete({ where: { id } });

        reply.status(200).send({ message: "Transação deletada com sucesso" });
    } catch (err) {
        request.log.error("Erro ao deletar transação", err);
        reply.status(500).send({ error: "Erro interno do servidor, falha ao deletar transação" });
    }
};