import { Request, Response } from "express";
import { IMessage } from "./chat.interface";
import { MessageModel } from "./chat.model";
import { v4 as uuidV4 } from 'uuid';
import { CallbackError } from "mongoose";
import webSocket from '../utils/web-sockets';
import { MESSAGE_TRIGGERS } from "../constants";

interface PostMessageRequest {
    isGroup: boolean;
    from: string;
    to: string;
    tokenResult: any;
    message: string;
    members: string[];
}

export const postMessage = (request: Request, response: Response) => {

    const roomId = request.params.roomId;
    const { isGroup, tokenResult, message, members } = request.body as PostMessageRequest;

    const room: IMessage = new MessageModel();
    room.to = roomId;
    room.isGroup = isGroup;
    room.message = message;
    room.from = tokenResult.userId;
    room.messageId = uuidV4();

    room.save((userError: CallbackError, roomDocument: IMessage) => {
        if (!userError) {
            // tslint:disable-next-line: no-shadowed-variable
            const { messageId  } = roomDocument;
            response.json({ messageId });
            webSocket.emit(MESSAGE_TRIGGERS.SEND_MESSAGE, members, {
                from: tokenResult.userId,
                to: roomId,
                message,
                isGroup,
                messageId
            });
            response.status(200);
        } else {
            response.json({
                error: 'Message creation failed'
            });
            response.status(400);
        }
        response.end();
    });
};
