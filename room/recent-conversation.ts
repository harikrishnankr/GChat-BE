import { Request, Response } from "express";

export const recentConversation = (request: Request, response: Response) => {
    // get recent conversations
    response.json([]);
    response.status(200);
    response.end();
};
