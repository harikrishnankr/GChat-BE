import express, { NextFunction, Router, Request, Response } from 'express';
import { validateToken } from '../utils/token.helper';
import { authenticateUser, getUsers } from './controllers';

export const getUserRoutes = () => {
    const router: Router = express.Router();

    router.route('/users')
    .get(validateToken, getUsers);

    router.route('/auth')
    .post(authenticateUser);

    return router;
};
