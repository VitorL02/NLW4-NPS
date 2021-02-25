import { Connection, createConnection, getConnection, getConnectionOptions } from 'typeorm';


export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions(); // "Pega "as configurações do OrmConfig

    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === "test"
                ? "./src/database/database.test.sqlite"
                : defaultOptions.database
        })
    );
};




// Exporta pra uma função async pra definir quando o banco de dados quando ele sera testado e quando sera de fato usado na aplicação