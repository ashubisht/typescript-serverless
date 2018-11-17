import * as pg from "pg";
import * as Knex from "knex";

let connection: Knex | undefined;

pg.defaults.ssl = true;

export const createOrGetConnection = async() =>{
    if(!connection){
        connection = Knex({
            client: "pg",
            useNullAsDefault: true,
            connection: {
                host : 'host',
                user : 'username',
                password : 'password',
                database : 'databaseName',
                ssl: true
            },
            pool: { min: 0, max: 7 },
            acquireConnectionTimeout: 10000
        } as any);
    }
    return connection;
}

export const destroyConnection = async() =>{
    if(connection){
        await connection.destroy();
        connection = undefined;
    }
}