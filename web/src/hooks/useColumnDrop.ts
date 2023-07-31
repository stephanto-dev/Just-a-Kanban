import {useDrop} from 'react-dnd';
import { StatusType, ItemType } from '../utils/enum';
import {DragItem, CardModel} from '../utils/models';

function useColumnDrop(
  column: StatusType,
  handleDrop: (fromColumn: StatusType, cardId: CardModel['idCard']) => void,
){
  const [{isOver}, dropRef] = useDrop<DragItem, void, {isOver: boolean}>({
    accept: ItemType.CARD,
    drop: (dragItem) => {
      if(!dragItem || dragItem.from === column){
        return;
      }

      handleDrop(dragItem.from, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return {
    isOver,
    dropRef
  }
}


export default useColumnDrop;