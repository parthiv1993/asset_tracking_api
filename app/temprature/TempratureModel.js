var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tempratureSchema = new Schema({
    tourId:  {
        type: String,
        require: true
    },
    truckId: {
        type: String,
        required: true
    },
    containerId: {
        type: String,
        required: true
    },
    temprature: Object,
    lastUpdatedOn: { type: Date, default: Date.now },
});

var Temprature = mongoose.model('Temprature', tempratureSchema);

module.exports = (function() {
    return {
        getAllTempratureData: _getAllTempratureData,
        insertTempratureData: _insertTempratureData,
        getTempratureDataForContainer: _getTempratureDataForContainer
    };

    function _getAllTempratureData(next) {
        Temprature.find(function(err, data) {
            if(err) {
                next([]);
                return;
            }
            next(data);
        });
    }

    function _insertTempratureData(tempData, next, error) {
        new Temprature(tempData).save(function(err){
            if(err) {
                console.log('_insertTempratureData failed');
                return error(err);
            }
            next();
        })
    }

    function _getTempratureDataForContainer(tourId, truckId, containerId, success, failure) {
        Temprature.find({tourId, truckId, containerId}, (err, temprature)=>{
            if (err) {
                failure(err);
                return;
            }
            success(temprature);
        });
    }

})();