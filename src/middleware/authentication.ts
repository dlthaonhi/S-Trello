import { NextFunction, Request, Response } from 'express';

import { verifyJwt } from '../services/jwtService';

export interface AuthenticatedRequest extends Request {
  user?: string | object;
  id?: string | null;
}

const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const decoded = verifyJwt(token);
    if (!decoded) {
      res.sendStatus(401);
      return;
    }
    req.user = decoded;
    req.id = decoded.userId as string;
    
    next();
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;
