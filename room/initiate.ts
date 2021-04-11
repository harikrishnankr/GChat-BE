import { Request, Response } from "express";

export const initiate = (request: Request, response: Response) => {
    // get recent conversations
    response.json({});
    response.status(200);
    response.end();
};
