var GPSModel = require('./GPSModel.js');

module.exports = (function(){
    return {
        getGPSData: _getGPSData,
        insertGSPData: _insertGSPData,
        getGPSDataByTourId: _getGPSDataByTourId
    };

    function _getGPSData(req, res) {
        GPSModel.getAllGPSData(function(data){
            res.json(data);
        });
    }

    function _getGPSDataByTourId(req, res) {
        const getLatest = req.query.latest;
        const tourId = req.params.tour_id;
        const truckId = req.params.truck_id;
        if (getLatest) {
            GPSModel.getLatestGPSDataByTourId(tourId, truckId, (result)=>{
                res.json(result);
            },(err)=>{
                res.status(400).json(err);
            });
            return;
        }

        GPSModel.getGPSDataByTourId(tourId, truckId, (result)=>{
            res.json(result);
        }, (err)=>{
            res.status(400).json(err);
        });
    }

    function _insertGSPData(req, res, next) {
        var gpsData = req.body;
        GPSModel.insertGPSDataForTour(gpsData,
        function() {
            res.json({ok: 'ok'});
        },
        function(err) {
            console.log('error: ', err);
            res.status(400).json(err);
        });
    }

})();

