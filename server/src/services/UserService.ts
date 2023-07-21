import { User } from "../database/models/User";
import { AppDataSource } from "../database/data-source";

import {hash} from 'bcryptjs';

interface IUser{
  username: string;
  email: string;
  password: string
}

const userRepository = AppDataSource.getRepository(User);

class UserService{
  async create({username, email, password}:IUser){
    //Verify if user already exists
    const userAlreadyExists = await userRepository.findOne({
      where:{email}
    })

    if(userAlreadyExists){
      throw new Error("User already exists!");
    }

    //Create user
    const passwordHash = await hash(password, 8);

    const user = await userRepository.save({
      email,
      password: passwordHash,
      username
    })

    return user
  }

  async list(){
    const users = await userRepository.find({
      select:{
        idUser: true,
        username: true,
        email: true,
        password: false,
      },
      order:{
        username: 'ASC'
      }
    })

    return users;
  }

  async delete(idUser: string){
    const deletedUser = await userRepository.delete({
      idUser
    });

    return deletedUser;
  }

  async show(idUser: string){
    const user = await userRepository.findOne({
      where: {idUser},
      select:{
        idUser: true,
        username: true,
        email: true,
        password: false,
      }
    });

    return user;
  }

  async update(idUser:string, username: string, email: string){
    const user = await userRepository.update(idUser, {username, email});

    return user;
  }
}

export { UserService }