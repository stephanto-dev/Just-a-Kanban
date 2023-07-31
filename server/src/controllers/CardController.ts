import {Request, Response} from 'express';
import { CardService } from '../services/CardService';


class CardController{
  async list(request: Request, response: Response){
    const cardService = new CardService();

    const cards = await cardService.listCards(response.locals.idUser);

    return response.status(200).json({
      cards
    })
  }

  async create(request:Request, response: Response){
    const cardService = new CardService();

    const {text, status, color} = request.body

    await cardService.create(text, status, response.locals.idUser, color);

    return response.status(201).json({
      message: "Card created"
    })
  }

  async delete(request:Request, response: Response){
    const cardService = new CardService();

    const {idCard} = request.params;

  await cardService.delete(idCard);

    return response.status(200).json({message: 'Card deleted'});
  }

  async update(request:Request, response:Response){
    const cardService = new CardService();

    const {idCard, text, status } = request.body;

    const card = await cardService.update(idCard, text, status);

    return response.status(200).json({card});
  }

  async show(request:Request, response:Response){
    const cardService = new CardService();

    const {idCard} = request.params;

    const card = await cardService.show(idCard, response.locals.idUser);

    if(!card){
      return response.status(401).json({message: 'Unauthorized'});
    }

    return response.status(200).json({card});
  }
}

export default new CardController();