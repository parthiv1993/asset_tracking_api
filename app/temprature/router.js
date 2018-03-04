var router = require('express').Router()
var tempratureController = require('./tempratureController.js');

router.get('/temprature', tempratureController.getTempratureData)
router.get('/temprature/:tourId/:truckId/:containerId', tempratureController.getTempratureDataForContainer)
router.post('/temprature', tempratureController.insertTempratureData);

module.exports = router