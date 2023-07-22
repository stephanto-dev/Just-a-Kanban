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

    console.log(user)

    return response.status(201).json({
      email:user.email,
      username: user.username
    })
  }

  async list(request:Request, response:Response){
    const userService = new UserService();

    const users = userService.list();

    return response.status(200).json({users:users});
  }

  async delete(request:Request, response: Response){
    const {idUser} = request.params;

    const userService = new UserService();

    const user = await userService.delete(idUser);

    return response.json({userDeleted: user});
  }

  async show(request: Request, response: Response){
    const userService = new UserService();

    const user = await userService.show(response.locals.idUser);

    return response.status(200).json({user})
  }

  async update(request:Request, response: Response){
    const {idUser, username, email} = request.body;

    const userService = new UserService();

    const user = await userService.update(idUser, username, email);

    return response.status(200).json({user})
  }
}

export default new UserController();