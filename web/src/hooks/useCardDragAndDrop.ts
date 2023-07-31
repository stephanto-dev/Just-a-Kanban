import {useDrag} from 'react-dnd';
import { ItemType } from '../utils/enum';
import { DragItem, CardModel } from '../utils/models';
import { useRef } from 'react';

export function useCardDragAndDrop<T extends HTMLElement>({
  card,
}: {
  card: CardModel;
  index: number;
}){
  const ref = useRef<T>(null);

  const [{isDragging}, drag] = useDrag<
    DragItem,
    void,
    {isDragging: boolean}
  >({
    type: ItemType.CARD,
    item: {from: card.status, id: card.idCard,},
    collect:(monitor) => ({
      isDragging: monitor.isDragging(),

    })
  });

  drag(ref);

  return{
    ref,
    isDragging
  }
}