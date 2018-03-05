var ToursModel = require('./ToursModel');

module.exports = (function(){
    return {
        insertToursData: _insertToursData,
        getAllTours: _getAllTours,
        getTourById: _getTourById,
        deleteAll: _deleteAll
    };
    
    function _insertToursData(req, res) {
        var toursData = req.body;
        ToursModel.insertToursData(toursData,function(result){
            res.status(207).json(result);
        })
    }

    function _getAllTours(req, res) {
        ToursModel.getAllTours(function(result) {
            res.json(result)
        });
    }

    function _getTourById(req, res) {
        const tourId = req.params.tour_id;
        ToursModel.getTourById(tourId, function(result) {
            res.json(result)
        }, function(err) {
            res.json(err);
        });
    }

    function _deleteAll(req, res) {
        ToursModel.deleteAll(function(result){
         res.json(result)   
        }, function(err){
           res.status.json(err) 
        })
    }

})();