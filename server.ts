import * as  jsonServer from 'json-server';
import { Express } from "express";
import * as fs from 'fs';
import * as https from 'https';
import { handleAuthentication } from './auth';

const PORT: number = 3001;

const server: Express = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', handleAuthentication);

server.use(router);

const options = {
  cert: fs.readFileSync('./keys/cert.pem'),
  key: fs.readFileSync('./keys/key.pem')
}

https.createServer(options, server).listen(PORT, () => {
  console.log(`JSON Server is running on https://localhost:${PORT}`)
})
