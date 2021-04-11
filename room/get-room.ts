import { Request, Response } from "express";

export const recentRoom = (request: Request, response: Response) => {
    // get recent conversations
    response.json({});
    response.status(200);
    response.end();
};
