var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var container = new Schema({
    containerId: {
        type: String
    },
    item: {
        type: String
    },
    deliveryPoint: {
        type: [Number, Number],
        index: '2d'
    },
    deliveryPointName: {
        type: String
    },
    tempratureThreshold:{
        type: String
    },
    humidityThreshold:{
        type: String
    }
});

var toursSchema = new Schema({
    tourId:  {
        type: String,
        require: true
    },
    tourName: {
        type: String
    },
    tourStartDate: {
        type: Date,
        default: Date.now
    },
    truckId: {
        type: String,
        required: true
    },
    startingPoint: {
        type: [Number, Number],
        index: '2d'
    },
    destination: {
        type: [Number, Number],
        index: '2d'
    },
    deliveryPoints: {
        type: [[Number, Number]],
        index: '2d'
    },
    goods: {
        type: [container]
    },
    lastUpdatedOn: { type: Date, default: Date.now },
});

var Tours = mongoose.model('Tours', toursSchema);

module.exports = (function() {
    return {
        insertToursData: _insertToursData,
        getAllTours: _getAllTours,
        getTourById: _getTourById,
        deleteAll: _deleteAll
    };

    function _insertToursData(toursData, next) {
        const errors = [];
        const successfull = [];
        const len = toursData.length-1;
        toursData.forEach((tour, i) => {
            new Tours(tour).save(function(err){
                if(err) {
                    console.log('_insertToursData failed');
                    errors.push(err)
                }
                successfull.push({ok:'ok'});
                if(i === len) {
                    const result = successfull.concat(errors);
                    next(result);
                }
            })
        });
    }

    function _getAllTours(next) {
        Tours.find((err, data)=>{
            if(err) {
                next([]);
                return;
            }
            next(data);
        });
    }

    function _getTourById(tourId, success, failure) {
        Tours.findOne({_id: tourId},function(error, tour) {
            if(error) {
                failure(error);
                return;
            }

            success(tour);
        });
    }

    function _deleteAll(success, failure) {
        Tours.remove({}, (err, result)=>{
            if (err) {
                failure(err);
                return
            }

            success(result);
        });
    }

})();