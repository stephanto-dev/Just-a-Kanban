import { Status } from "../database/models/Status";

interface ICard {
  idCard: string,
  text?: string,
  status: Status,
  color?: string,
}

export {ICard};