import * as express from 'express';
import controller from '../controller/controller';

const router = express.Router()

router.get('/columns', controller.getDataFromTable)

router.post('/cards', controller.addCard)

router.post('/columns', controller.addColumn)

router.put('/columns', controller.moveColumn)

router.put('/cards', controller.moveCard)

router.delete('/card', controller.deleteCard)

router.delete('/column', controller.deleteColumn)

router.patch('/cards/:id', controller.renameCard)

router.patch('/columns/:columnId', controller.renameColumn)

export default router