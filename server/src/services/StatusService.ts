import { AppDataSource } from "../database/data-source";
import { Status } from "../database/models/Status";
import { IStatus } from "../interfaces/IStatus";

const statusRepository = AppDataSource.getRepository(Status);


class StatusService{
  async getAllStatus(){
    const status = await statusRepository.find()
    return status;
  }

  async getStatus(idStatus: string){
    const status = await statusRepository.findOne({
      where: {
        idStatus
      }
    })

    return status;
  }

  async createStatus(idStatus:string ,status:string){
    const statusName = await statusRepository.save({idStatus, status})
    return statusName;
  }

  async updateStatus(idStatus: string, status: string){
    const newStatus = await statusRepository.save({
      idStatus,
      status
    })

    return newStatus;
  }

  async deleteStatus(idStatus:string){
    const status = await statusRepository.delete({idStatus})
    return status;
  }
}

export {StatusService}