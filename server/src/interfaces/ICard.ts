import { Status } from "../database/models/Status";

interface ICard {
  idCard: string,
  text?: string,
  idStatus: Status
}

export {ICard};