import { Router } from 'express';

import CardController  from './controllers/CardController';
import StatusController from './controllers/StatusController';
import UserController  from './controllers/UserController';
import AuthenticateUserController  from './controllers/AuthenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';


const router = Router();

//cards
router.get('/cards', CardController.getCards);

//Status
router.get('/status', StatusController.getAllStatus);
router.get('/status/:idStatus', StatusController.getStatus);
router.post('/status', StatusController.createStatus);
router.put('/status/:idStatus', StatusController.updateStatus);
router.delete('/status/:idStatus', StatusController.deleteStatus);

//User
router.post('/user', UserController.create);
router.get('/users', UserController.list);
router.get('/user', UserController.show);
router.put('/user/:idUser', UserController.update);
router.delete('/user/:idUser',UserController.update);

//Authenticate user
router.post('/login', AuthenticateUserController.login);

export {router}