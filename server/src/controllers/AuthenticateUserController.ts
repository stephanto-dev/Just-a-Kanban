import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController{
  async login(request:Request, response: Response){
    const {email, password} = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({email, password});

    return response.json(token);
  }
}

export default new AuthenticateUserController();