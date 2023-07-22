import { AppDataSource } from "../database/data-source";
import { User } from "../database/models/User";
import { compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken';

interface IUserRequest {
  email:string;
  password: string;
}

const userRepository = AppDataSource.getRepository(User);

class AuthenticateUserService{
  async execute({email, password}:IUserRequest){
    //Verify if user exists
    const userExists = await userRepository.findOne({
      where:{
        email
      }
    });

    if(!userExists){
      throw new Error('Email/Password incorrect!')
    }

    //Verify if password matches
    const passwordMatch = await compare(password, userExists.password);
    if(!passwordMatch){
      throw new Error('Email/Password incorrect!')
    }

    //Generate user token
    const token = sign({},'just a Kanban',{
      subject: userExists.idUser,
      expiresIn: '30d'
    } )

    return {token}
  }
}

export {AuthenticateUserService}