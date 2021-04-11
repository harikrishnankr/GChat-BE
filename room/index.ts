import express, { Router } from 'express';
import { recentRoom } from './get-room';
import { initiate } from './initiate';
import { recentConversation } from './recent-conversation';
import { postMessage } from './post-message';
import { markConversationReadByRoomId } from './mark-as-read';

export const getRoomRoutes = (): Router => {
    const router: Router = express.Router();

    router
    .get('/', recentConversation)
    .get('/:roomId', recentRoom)
    .post('/initiate', initiate)
    .post('/:roomId/message', postMessage)
    .put('/:roomId/mark-read', markConversationReadByRoomId)

    return router;
};
