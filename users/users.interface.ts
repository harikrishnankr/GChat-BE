import { Document } from 'mongoose';

export interface IUserCollection {
    name: string;
    email: string;
    userId: string;
}

export interface IAuth {
    g_token: string;
}

export interface IGAuthResponse {
    clientId: string;
    email: string;
    name: string;
    picture: string;
}

export interface IAuthTokenPayload {
    name: string;
    email: string;
}

export interface IUser extends IUserCollection, Document {}
