import { Router } from 'express';

import CardController  from './controllers/CardController';
import StatusController from './controllers/StatusController';

const router = Router();

//cards
router.get('/cards', CardController.getCards);

//Status
router.get('/status', StatusController.getAllStatus);
router.get('/status/:idStatus', StatusController.getStatus);
router.post('/status', StatusController.createStatus);
router.put('/status/:idStatus', StatusController.updateStatus);
router.delete('/status/:idStatus', StatusController.deleteStatus);

export {router}