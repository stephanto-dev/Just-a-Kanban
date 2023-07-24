import {useCallback} from 'react';
import {v4 as uuid} from 'uuid';
import { ColumnType } from '../utils/enum';
import {CardModel} from '../utils/models';
import useCardCollection from './useCardCollection';
import { pickChackraRandomColor } from '../utils/helpers';


const ColumnColorScheme: Record<ColumnType, string> ={
  TODO:'gray',
  'IN PROGRESS': 'blue',
  BLOCKED: 'red',
  COMPLETED: 'green'
}

function useColumnCards(column:ColumnType){
  const [cards, setCards] = useCardCollection();

  const addEmptyCard = useCallback(() => {
    setCards((allCards) =>{
      const columnCards = allCards[column]

      if(columnCards.length > 100){
        console.log('too many cards!');
        return allCards;
      }

      const newColumnCard:CardModel = {
        id: uuid(),
        title: `New ${column} task`,
        color: pickChackraRandomColor('.300'),
        column
      }

      return {
        ...allCards,
        [column]: [newColumnCard, ...columnCards]
      }
    })
  }, [column, setCards]);

  const updateCard = useCallback((
    id: CardModel['id'], updateCard: Omit<Partial<CardModel>, 'id'>
  ) => {

    setCards((allCards) => {
      const columnCards = allCards[column];

      return {
        ...allCards,
        [column]: columnCards.map((card) => card.id === id ? {...card, ...updateCard} : card)
      }
    })

  }, [column, setCards])

  const deleteCard = useCallback(
    (id: CardModel['id']) => {

      setCards((allCards) => {
        const columnCards = allCards[column];

        return {
          ...allCards,
          [column]: columnCards.filter((card) => card.id !== id)
        }
      })

    }, [column, setCards]
    )

  const dropCardFrom = useCallback(
    (from: ColumnType, id:CardModel['id']) => {
      setCards((allCards) => {
        const fromColumnCards = allCards[from];
        const toColumnCards = allCards[column];
        const movingCard = fromColumnCards.find((card) => card.id === id);

        if(!movingCard){
          return allCards;
        }

        return{
          ...allCards,
          [from]: fromColumnCards.filter((card) => card.id !== id),
          [column]: [{...movingCard, column}, ...toColumnCards]
        }
      })
    },
    [column, setCards]
  )

  return{
    cards: cards[column],
    addEmptyCard,
    updateCard,
    deleteCard,
    dropCardFrom
  }
}

export default useColumnCards;