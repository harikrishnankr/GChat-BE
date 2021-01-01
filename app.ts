import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { setUserRoutes } from './users';
import { connectToDb } from './connections';
import cors, { CorsOptions } from 'cors';

const app = express();
const router = express.Router();
const server = http.createServer(app);
const PORT = 8000;

const whitelist = ['http://localhost:9000', 'http://localhost:8000']
const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (whitelist.indexOf(origin as string) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

connectToDb();
// Index page for Rest API
app.get('/', (req: Request, res: Response) => res.send('Welcome to Chaaat!! API Service'));
// Set all routings for user
setUserRoutes(router);

app.use('', router);

server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});