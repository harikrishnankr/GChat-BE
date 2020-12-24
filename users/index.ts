import { Application, Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { IUser } from './users.interface';
import { UserModel } from './users.model';
import { v4 as uuidV4 } from 'uuid';

const users: Array<any> = [];

export const setUserRoutes = (app: Application) => {
    app.get('/users', (request: Request, response: Response) => {
        UserModel.find((error: CallbackError, document: IUser) => {
            if (!error) {
                response.json(document);
                response.end();
            }
        });
    });

    app.post('/user/add', (request: Request, response: Response) => {
        const user: IUser = new UserModel();
        const {
            firstName,
            lastName,
            username,
            email
        } = request.body;
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;
        user.userId = uuidV4();

        user.save((error: CallbackError, document: IUser) => {
            if (!error) {
                response.json({
                    type: 'Success',
                    result: {
                        ...document
                    }
                });
            } else {
                response.json({
                    type: 'Error',
                    message: 'Couldn\'t save user. Please try again'
                });
            }
            response.end();
        });
    });
};
