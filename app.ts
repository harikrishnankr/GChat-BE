import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { getUserRoutes } from './users';
import { connectToDb } from './connections';
import cors, { CorsOptions } from 'cors';
import { validateToken } from './utils/token.helper';
import { getRoomRoutes } from './room';
import WebSockets from './utils/web-sockets';
import { WHITE_LIST } from './config';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (origin === undefined || WHITE_LIST.indexOf(origin as string) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

connectToDb();
// Index page for Rest API
app.get('/', (req: Request, res: Response) => res.send('Welcome to Chaaat!! API Service'));

// Set all routings for user
app.use('', getUserRoutes());
app.use('/room', validateToken, getRoomRoutes());

// CreateServer for socket connection
WebSockets.createServer(server);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      error: 'API endpoint doesn\'t exist'
    })
});

server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});