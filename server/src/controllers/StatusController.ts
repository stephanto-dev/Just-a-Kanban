import { Request, Response } from "express";
import { StatusService } from "../services/StatusService";
import { IStatus } from "../interfaces/IStatus";
import {v4 as uuid} from 'uuid';

class StatusController{
  async createStatus(request:Request, response: Response){
    const statusService = new StatusService();

    const {status} = request.body;
    

    const newStatus = await statusService.createStatus(status);

    return response.status(201).json({newStatus});

  }

  async getStatus(request:Request, response:Response){
    const statusService = new StatusService();

    const {idStatus} = request.body;

    const status = await statusService.getStatus(idStatus);

    return response.status(200).json({status});
  }

  async getAllStatus(request:Request, response:Response){
    const statusService = new StatusService();

    const status = await statusService.getAllStatus();

    return response.status(200).json({status})
  }

  async deleteStatus(request:Request, response: Response){
    const statusService = new StatusService();

    const {idStatus} = request.params;

    await statusService.deleteStatus(Number(idStatus));

    return response.status(200).json({message: 'Status deleted.'});
  }

  async updateStatus(request:Request, response: Response){
    const statusService = new StatusService();

    const {idStatus} = request.params;
    const {status} = request.body;

    const newStatus = await statusService.updateStatus(Number(idStatus), status);

    return response.status(200).json({newStatus});
  }
}

export default new StatusController();