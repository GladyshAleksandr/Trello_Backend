const router = require('express').Router()

const controller = require('../controller/controller.ts')

router.get('/', controller.getDataFromTable)

router.post('/add-card', controller.addCard)

router.post('/add-column', controller.addColumn)

router.post('/move-column', controller.moveColumn)

router.post('/move-card', controller.moveCard)

router.delete('/delete-card', controller.deleteCard)

router.delete('/delete-column', controller.deleteColumn)

router.post('/rename-card', controller.renameCard)

router.post('/rename-column', controller.renameColumn)

module.exports = router