var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gpsSchema = new Schema({
    tourId:  {
        type: String,
        require: true
    },
    truckId: {
        type: String,
        required: true
    },
    location: {
        type: [Number, Number],
        index: '2d'
    },
    lastUpdatedOn: { type: Date, default: Date.now },
});

var GPS = mongoose.model('GPS', gpsSchema);

module.exports = (function() {
    return {
        getAllGPSData: _getAllGPSData,
        insertGPSDataForTour: _insertGPSDataForTour,
        getGPSDataByTourId: _getGPSDataByTourId,
        getLatestGPSDataByTourId: _getLatestGPSDataByTourId
    };

    function _getAllGPSData(next) {
        GPS.find(function(err, data) {
            if(err) {
                next([]);
                return;
            }
            next(data);
        });
    }

    function _insertGPSDataForTour(gpsData, next, error) {
        new GPS(gpsData).save(function(err){
            if(err) {
                console.log('_insertGPSDataForTour failed');
                return error(err);
            }
            next();
        })
    }

    function _getGPSDataByTourId(tourId, truckId, success, failure) {
        console.log('tour Id: ', tourId, ' truck Id: ', truckId);
        GPS.find({tourId, truckId}, (err, data)=>{
            if(err) {
                failure(err);
                return;
            }

            success(data);
        });
    }

    function _getLatestGPSDataByTourId(tourId, truckId, success, failure) {
        GPS.findOne().sort('-lastUpdatedOn')
        .exec((err, data) => {
            if (err) {
                failure(err);
                return;
            }

            success(data);
        });
    }

})();