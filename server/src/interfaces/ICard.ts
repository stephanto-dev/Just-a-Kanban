import { Status } from "../database/models/Status";

interface ICard {
  idCard: string,
  text?: string,
  status: Status
}

export {ICard};