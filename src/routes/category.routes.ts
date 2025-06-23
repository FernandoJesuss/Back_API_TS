import  type { FastifyInstance } from 'fastify';
import { getCategories } from '../controller/category.controller';



const CategoryRoutes = async (fastify: FastifyInstance): Promise<void> => {

fastify.get("/",getCategories)
}

export default CategoryRoutes;  