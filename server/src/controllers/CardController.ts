import {Request, Response} from 'express';
import { CardService } from '../services/CardService';


class CardController{
  async getCards(request: Request, response: Response){
    const cardService = new CardService();

    const cards = await cardService.getCards();

    return response.status(200).json({
      cards
    })
  }
}

export default new CardController();