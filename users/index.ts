import { Request, Response, Router } from 'express';
import { CallbackError } from 'mongoose';
import { IAuth, IUser } from './users.interface';
import { UserModel } from './users.model';
import { v4 as uuidV4 } from 'uuid';
import googleAuth from './google-auth';
import { getAuthToken, validateToken } from '../utils/token.helper';

export const setUserRoutes = (app: Router) => {
    app.route('/users')
    .get(validateToken, (request: Request, response: Response) => {
        UserModel.find((error: CallbackError, document: IUser) => {
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
    });

    app.route('/auth')
    .post(async (request: Request, response: Response) => {
        const gAuth = await googleAuth((request.body as IAuth).g_token);
        const query = { email: gAuth.email}
        UserModel.findOne(query, (error: CallbackError, document: IUser) => {
            if (!error) {
                if (document) {
                    const { email, name } = document;
                    const token = getAuthToken({ email, name });
                    response.json({ email, name, token});
                    response.status(200);
                    response.end();
                } else {
                    const user: IUser = new UserModel();
                    user.name = gAuth.name as string;
                    user.email = gAuth.email as string;
                    user.userId = uuidV4();
                    user.save((userError: CallbackError, userDocument: IUser) => {
                        if (!userError) {
                            const { email, name } = userDocument;
                            const token = getAuthToken({ email, name });
                            response.json({ email, name, token});
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
    });
};
