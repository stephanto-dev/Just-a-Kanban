import { ColumnType } from "./enum";;

export interface CardModel{
  id: string;
  title: string;
  column: ColumnType;
  color: string;
}

export interface DragItem{
  index: number;
  id: CardModel['id'];
  from: ColumnType;
}