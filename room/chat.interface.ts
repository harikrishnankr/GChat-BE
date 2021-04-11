import { Document } from 'mongoose';

interface IRoomCollection {
    roomId: string;
    name: string;
    members: number[];
}

interface IMessageCollection {
    fromId: string;
    toId: string;
    message: string;
    roomId: string;
}

export interface IRoom extends IRoomCollection, Document {};
export interface IMessage extends IMessageCollection, Document {};
