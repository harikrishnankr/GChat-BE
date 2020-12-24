import { NextFunction, Response, Request } from 'express';
import jsonwebtoken, { VerifyOptions } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { IAuthTokenPayload } from '../users/users.interface';
const options = { expiresIn: '2d' };

export const getAuthToken = (payload: IAuthTokenPayload): string => {
    const token = jsonwebtoken.sign(payload, JWT_SECRET, options);

    return token;
};

export const validateToken = (request: Request, response: Response, next: NextFunction) => {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]; // Bearer <token>
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            const tokenResult = jsonwebtoken.verify(token, JWT_SECRET, { maxAge: options.expiresIn });

            // Let's pass back the decoded token to the request object
            request.body = {
                ...request.body,
                tokenResult
            };
            // We call next to pass execution to the subsequent middleware
            next();
        } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            throw new Error(err);
        }
    } else {
        response.json({
            error: 'Authentication error. Token required'
        });
        response.status(401);
        response.end();
    }
};
