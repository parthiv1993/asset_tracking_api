var TempratureModel = require('./TempratureModel');

module.exports = (function(){
    return {
        getTempratureData: _getTempratureData,
        getTempratureDataForContainer: _getTempratureDataForContainer,
        insertTempratureData: _insertTempratureData
    };

    function _getTempratureData(req, res) {
        TempratureModel.getAllTempratureData(function(data) {
            res.json(data);
        });
    }

    function _getTempratureDataForContainer(req, res) {
        const tourId = req.params.tourId;
        const truckId = req.params.truckId;
        const containerId = req.params.containerId;
        console.log(tourId, truckId, containerId);
        TempratureModel.getTempratureDataForContainer(tourId, truckId, containerId, (result)=>{
            res.json(result);
        }, (err)=>{
            res.status(400).json(err);
        });
    }

    function _insertTempratureData(req, res) {
        var tempratureData = req.body;
        console.log('temperature to insert',tempratureData);
        TempratureModel.insertTempratureData(tempratureData,function(){
            res.json({ok: 'ok'});
        },
        function(err) {
            res.status(400).json(err);
        });
    }

})();
