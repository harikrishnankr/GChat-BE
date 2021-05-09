import { Document } from 'mongoose';

interface IRoomCollection {
    roomId: string;
    name: string;
    members: string[];
    isGroup: boolean;
    creator: string;
}

interface IMessageCollection {
    from: string;
    to: string;
    message: string;
    isGroup: boolean;
    messageId: string;
}

export interface IRoom extends IRoomCollection, Document {};
export interface IMessage extends IMessageCollection, Document {};
