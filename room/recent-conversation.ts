import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { IRoom } from "./chat.interface";
import { RoomModel } from "./chat.model";

interface RecentConversation {
    tokenResult: any;
}

export const recentConversation = (request: Request, response: Response) => {

    const { tokenResult } = request.body as RecentConversation;

    RoomModel.find({ members: { $in: [tokenResult.userId] } }, (error: CallbackError, document: IRoom[]) => {
        if (!error) {
            response.json(document);
            response.status(200);
            response.end();
        } else {
            response.json({
                error: 'Something went wrong!'
            });
            response.status(500);
            response.end();
        }
    });

};
