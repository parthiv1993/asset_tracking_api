var router = require('express').Router()
var gpsController = require('./gpsController');

router.get('/gps', gpsController.getGPSData)
router.get('/gps/:tour_id/:truck_id', gpsController.getGPSDataByTourId)
router.post('/gps', gpsController.insertGSPData)

module.exports = router