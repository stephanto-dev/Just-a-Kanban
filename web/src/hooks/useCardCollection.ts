import {v4 as uuid} from 'uuid';
import { ColumnType } from '../utils/enum';
import {CardModel} from '../utils/models';
import { useLocalStorage } from 'usehooks-ts';

function useCardCollection(){
  return useLocalStorage<{
    [key in ColumnType]: CardModel[];
  }>('tasks', {
    TODO: [
      {
        id: uuid(),
        column: ColumnType.TO_DO,
        title: 'Task 1',
        color: 'blue.300'
      }
    ],
    'IN PROGRESS': [
      {
        id: uuid(),
        column: ColumnType.IN_PROGRESS,
        title: 'Task 2',
        color: 'yellow.300'
      }
    ],
    BLOCKED: [
      {
        id: uuid(),
        column: ColumnType.BLOCKED,
        title: 'Task 3',
        color: 'red.300'
      }
    ],
    COMPLETED: [
      {
        id: uuid(),
        column: ColumnType.COMPLETED,
        title: 'Task 4',
        color: 'green.300'
      }
    ],
  });
}

export default useCardCollection