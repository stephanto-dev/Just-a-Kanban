import { AppDataSource } from "../database/data-source";
import { User } from "../database/models/User";
import { compare } from 'bcryptjs';

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



  }
}

export {AuthenticateUserService}