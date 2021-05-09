import express, { Router } from 'express';
import { recentRoom } from './get-room';
import { initiate } from './initiate';
import { recentConversation } from './recent-conversation';
import { postMessage } from './post-message';
import { markConversationReadByRoomId } from './mark-as-read';
import { validateToken } from '../utils/token.helper';

export const getRoomRoutes = (): Router => {
    const router: Router = express.Router();

    router
    .post('/initiate', validateToken, initiate)
    .get('/', validateToken, recentConversation)
    .post('/:roomId/message', validateToken, postMessage)
    .get('/:roomId', recentRoom)
    .put('/:roomId/mark-read', markConversationReadByRoomId)

    return router;
};
