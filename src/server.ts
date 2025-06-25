// import dotenv from "dotenv";
import { env } from "./config/env";
import app from "./app";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";
// dotenv.config();


const PORT = env.PORT;   //Number (process.env.PORT);

const startServer = async () => {

try {

await  prismaConnect();

await initializeGlobalCategories();

    await app.listen({ port: PORT }).then(() => {
         console.log(`Servidor rodando na porta ${PORT}`)
        })
} catch (err) {
    console.error(err);
}
    
}

startServer() 







