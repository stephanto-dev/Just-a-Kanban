import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'



export function ensureAuthenticated(request:Request, response: Response, next:NextFunction){
  const authToken = request.headers.authorization;

  if(!authToken){
    return response.status(401).json({
      message: 'unauthorized'
    })
  }

  const [,token] = authToken.split(' ');

  try {
    verify(token, 'just a Kanban');

    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'token invalid'
    })
  }
}