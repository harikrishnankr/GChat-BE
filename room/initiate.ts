import { Request, Response } from "express";
import { IRoom } from "./chat.interface";
import { RoomModel } from "./chat.model";
import { v4 as uuidV4 } from 'uuid';
import { CallbackError } from "mongoose";
import webSocket from '../utils/web-sockets';
import { MESSAGE_TRIGGERS } from "../constants";

interface GroupRequest {
    name: string;
    isGroup: boolean;
    members: string[];
    tokenResult: any;
}

export const initiate = (request: Request, response: Response) => {
    // get recent conversations

    const { isGroup, name, members, tokenResult } = request.body as GroupRequest;

    const room: IRoom = new RoomModel();
    room.name = name;
    room.isGroup = isGroup;
    room.members = members.includes(tokenResult.userId) ? members : [
        ...members,
        tokenResult.userId
    ];
    room.creator = tokenResult.userId;
    room.roomId = uuidV4();

    room.save((userError: CallbackError, roomDocument: IRoom) => {
        if (!userError) {
            // tslint:disable-next-line: no-shadowed-variable
            const { roomId, members  } = roomDocument;
            response.json({ roomId, name, members });
            webSocket.emit(MESSAGE_TRIGGERS.GROUP_CREATED, members, roomDocument);
            response.status(200);
        } else {
            response.json({
                error: 'Room creation failed'
            });
            response.status(400);
        }
        response.end();
    });
};
