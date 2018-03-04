var router = require('express').Router()
var toursController = require('./toursController.js');

router.post('/tours', toursController.insertToursData);
router.get('/tours', toursController.getAllTours);
router.get('/tours/:tour_id', toursController.getTourById)

module.exports = router