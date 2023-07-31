import {Card} from '../database/models/Card';
import {AppDataSource} from '../database/data-source';
import { Status } from '../database/models/Status';
import { User } from '../database/models/User';

const cardsRepository = AppDataSource.getRepository(Card);
const userRepository = AppDataSource.getRepository(User);

class CardService{
  async listCards(idUser:string){
      const cards = await cardsRepository.find({
        where:{
          users:{idUser}
        },
        relations:{
          status: true
        }
      });

    return cards;
  }

  async create(text:string, status: Status, idUser:string, color?:string){
    const userToSave = await userRepository.findOne(
      {
        where:{idUser}
      }
      )
    
    if(userToSave){
      const card = await cardsRepository.save({
        text,
        status,
        color,
        users:[userToSave]
      });

      return card;
    }

    throw new Error('Error to create a card');
  }

  async delete(idCard:string){
    const card = await cardsRepository.delete({idCard})

    return card
  }

  async update(idCard:string, text?:string, status?: Status){
    const card = await cardsRepository.save({
      idCard,
      text,
      status,
    })

    return card;
  }

  async show(idCard:string, idUser:string){
    const card = await cardsRepository.findOne({
      where:{idCard, users:{idUser}},
      relations:{status:true}
    })

    return card;
  }
}

export {CardService};