const router = require('express').Router()
const wareModel = require('../models/waresModel')

router.get('/', wareModel.getAllWares)

router.post('/', wareModel.addWare)

router.get('/:id', wareModel.getWareById)
router.get('/fruits', wareModel.getFruits)
router.get('/', wareModel.getVegetables)

router.put('/', wareModel.updateWare)

router.delete('/:id', wareModel.deleteWare)


module.exports = router