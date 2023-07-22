import { Request, Response, response } from "express";
import { UserService } from "../services/UserService";

interface IUser{
  username: string;
  email: string;
  password: string
}

class UserController{
  async create(request:Request, response:Response){
    const {username, email, password} = request.body;

    const userService = new UserService();

    const user:IUser = await userService.create({username, email, password})

    return response.status(201).json({
      email:user.email,
      username: user.username
    })
  }

  async list(request:Request, response:Response){
    const userService = new UserService();

    const users = await userService.list();

    return response.status(200).json({users:users});
  }

  async delete(request:Request, response: Response){
    const userService = new UserService();
    
    const {idUser} = request.body;

    if(!idUser){
      const user = await userService.delete(response.locals.idUser)

      return response.json({userDeleted: user});
    }
    
    const user = await userService.delete(idUser);

    return response.json({userDeleted: user});
  }

  async show(request: Request, response: Response){
    const userService = new UserService();

    const user = await userService.show(response.locals.idUser);

    return response.status(200).json({user})
  }

  async update(request:Request, response: Response){
    const {username, email} = request.body;

    const userService = new UserService();

    await userService.update(response.locals.idUser, username, email);

    const user = await userService.show(response.locals.idUser);

    return response.status(200).json({user})
  }
}

export default new UserController();