import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { setUserRoutes } from './users';
import { connectToDb } from './connections';

const app = express();
const server = http.createServer(app);
const PORT = 8000;

app.use(bodyParser.json());
connectToDb();
// Index page for Rest API
app.get('/', (req: Request, res: Response) => res.send('Welcome to Chaaat!! API Service'));
// Set all routings for user
setUserRoutes(app); 

server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});