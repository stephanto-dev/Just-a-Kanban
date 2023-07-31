import { StatusType } from "./enum";


export interface CardModel{
  idCard: string;
  text: string;
  status: {
    idStatus: number;
    status: string;
  };
  color?: string;
}

export interface StatusModel{
  idStatus: number;
  status: string;
}

export interface DragItem{
  id: CardModel['idCard'];
  from: StatusType;
}