import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { createError } from './error.js';

export interface ReqWithCookies extends Request {
  user: any;
  cookies: {
    access_token: string;
  };
}

export const verifyToken = (
  req: ReqWithCookies,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT, (err: Error, user: any) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};
