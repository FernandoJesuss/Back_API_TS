import { TransactionType } from "../../generated/prisma";

export interface TransactionFilter {
	userId: string;
	date?: {
		gte: Date;
		lte: Date;
	};

    type?: TransactionType;
    categoryId?: string;
}
