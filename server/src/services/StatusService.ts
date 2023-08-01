import { AppDataSource } from "../database/data-source";
import { Status } from "../database/models/Status";

const statusRepository = AppDataSource.getRepository(Status);


class StatusService{
  async getAllStatus(){
    const status = await statusRepository.find()
    return status;
  }

  async getStatus(idStatus: number){
    const status = await statusRepository.findOne({
      where: {
        idStatus
      }
    })

    return status;
  }

  async createStatus(status:string){
    const statusName = await statusRepository.save({status})
    return statusName;
  }

  async updateStatus(idStatus: number, status: string){
    const newStatus = await statusRepository.save({
      idStatus,
      status
    })

    return newStatus;
  }

  async deleteStatus(idStatus:number){
    const status = await statusRepository.delete({idStatus})
    return status;
  }
}

export {StatusService}