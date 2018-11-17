import * as serverless from 'serverless-http'; //Import statement has an issue with typescript es6
import * as express  from 'express';
import {createOrGetConnection} from "./dbConnection";
import {Model} from "objection";
import DbInit from './DbInit';
import * as usderDao from "./userdao";

const app = express();

let connectionExist: Boolean = false;

//called everytime api is hit
if(!connectionExist){
  createOrGetConnection().then(async(connectionInstance)=>{
    await Model.knex(connectionInstance);
      connectionExist = true;
      await DbInit.createSchema();
  });
}

app.get('/', (req, res) =>{
  res.send(JSON.stringify(connectionExist));
});

app.get('/insertPeople', async (req, res) =>{
  const resp = await usderDao.insertPeople();
  res.send(resp);
});

app.get('/insertVehicle', async (req, res) =>{
  const resp = await usderDao.insertVehicle();
  res.send(resp);
});

module.exports.handler = serverless(app);