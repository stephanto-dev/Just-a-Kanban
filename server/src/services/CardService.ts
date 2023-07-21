import {Card} from '../database/models/Card';
import {AppDataSource} from '../database/data-source';
import { ICard } from '../interfaces/ICard';

const cardsRepository = AppDataSource.getRepository(Card);

class CardService{
  async getCards(): Promise<ICard[]>{
    const cards = await cardsRepository.find();

    return cards;
  }
}

export {CardService};