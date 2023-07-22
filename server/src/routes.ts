import { Router } from 'express';

import CardController  from './controllers/CardController';
import StatusController from './controllers/StatusController';
import UserController  from './controllers/UserController';
import AuthenticateUserController  from './controllers/AuthenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';


const router = Router();

//cards
router.get('/cards', ensureAuthenticated ,CardController.list);
router.get('/card/:idCard', ensureAuthenticated, CardController.show);
router.post('/card', ensureAuthenticated ,CardController.create);
router.delete('/card/:idCard', ensureAuthenticated, CardController.delete);
router.put('/card', ensureAuthenticated, CardController.update);

//Status
router.get('/status', ensureAuthenticated ,StatusController.getAllStatus);
router.get('/status/:idStatus', ensureAuthenticated ,StatusController.getStatus);
router.post('/status', ensureAuthenticated ,StatusController.createStatus);
router.put('/status/:idStatus', ensureAuthenticated ,StatusController.updateStatus);
router.delete('/status/:idStatus', ensureAuthenticated ,StatusController.deleteStatus);

//User
router.post('/user', UserController.create);
// router.get('/users', ensureAuthenticated,UserController.list);
router.get('/user', ensureAuthenticated ,UserController.show);
router.put('/user', ensureAuthenticated ,UserController.update);
router.delete('/user', ensureAuthenticated ,UserController.delete);

//Authenticate user
router.post('/login', AuthenticateUserController.login);

export {router}