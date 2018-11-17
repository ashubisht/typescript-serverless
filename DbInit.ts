import { createOrGetConnection } from "./dbConnection";
import * as Knex from "knex"

//Model.knex(createOrGetConnection());

const createSchema = async() =>{
  try{
    const knex = await createOrGetConnection();
    let hasTable = await knex.schema.hasTable('persons');
    if (!hasTable) {
        console.log("Person Table not present");
        await knex.schema.createTable('persons', (table) => {
        table.increments('id').primary();
        table.integer('parent_id').references('persons.id');
        table.string('firstName');
      });
      console.log("Persons table created ");
    }else{
      console.log("Table persons already present");
    }
  
    //Create table vehicle
    hasTable = await knex.schema.hasTable('vehicle');
    if(!hasTable){
      console.log("vehicle table not present")
      await knex.schema.raw(`CREATE TABLE VEHICLE (
        id SERIAL PRIMARY KEY,
        model text NOT NULL,
        person_id integer not null references persons (id) )
      `);
      console.log("Vehicle table created");
    }else{
      console.log("Vehicle table present");
    }
    return "SUCCESS";
  }catch(ex){
    console.log("Exception occurred during db init: ", ex);
  }
}

export default {createSchema};