import { Document } from 'mongoose';

export interface IUserCollection {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    userId: string;
}

export interface IUser extends IUserCollection, Document {}
