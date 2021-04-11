import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { getAuthToken } from '../utils/token.helper';
import googleAuth from './google-auth';
import { IAuth, IUser } from './users.interface';
import { UserModel } from './users.model';
import { v4 as uuidV4 } from 'uuid';

export const getUsers = (request: Request, response: Response) => {
    UserModel.find((error: CallbackError, document: IUser[]) => {
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

export const authenticateUser = async (request: Request, response: Response) => {
    try {
        const gAuth = await googleAuth((request.body as IAuth).g_token);
        const query = { email: gAuth.email}
        UserModel.findOne(query, (error: CallbackError, document: IUser) => {
            if (!error) {
                if (document) {
                    const { email, name, userId } = document;
                    const token = getAuthToken({ email, name });
                    response.json({ email, name, token, userId });
                    response.status(200);
                    response.end();
                } else {
                    const user: IUser = new UserModel();
                    user.name = gAuth.name as string;
                    user.email = gAuth.email as string;
                    user.userId = uuidV4();
                    user.save((userError: CallbackError, userDocument: IUser) => {
                        if (!userError) {
                            const { email, name, userId } = userDocument;
                            const token = getAuthToken({ email, name });
                            response.json({ email, name, token, userId });
                            response.status(200);
                        } else {
                            response.json({
                                error: 'Authentication failed'
                            });
                            response.status(403);
                        }
                        response.end();
                    });
                }
            } else {
                response.json({
                    error: 'Authentication failed'
                });
                response.status(403);
                response.end();
            }
        });
    } catch (exp) {
        response.json({
            error: 'Authentication failed'
        });
        response.status(403);
        response.end();
    }
};
