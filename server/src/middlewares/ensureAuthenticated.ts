import { NextFunction, Request, Response } from "express";
import {verify, JwtPayload} from 'jsonwebtoken'



export function ensureAuthenticated(request:Request, response: Response, next:NextFunction){
  const authToken = request.headers.authorization;

  if(!authToken){
    return response.status(401).json({
      message: 'unauthorized'
    })
  }

  const [,token] = authToken.split(' ');

  try {
    const data = verify(token, 'just a Kanban') as JwtPayload;
    
    response.locals.idUser = data.sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Invalid Token'
    })
  }
}