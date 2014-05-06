var assert = require("assert"),
    w1bus = require("../w1bus");

//--------------------------------------------------------------------------------
// test cases - testing for failure
//
describe('W1bus', function(){
  describe('#listAllSensors()', function(){
    it('should return an error because no sensor/probe are connected!', function(){
        var bus = w1bus.create();
        bus.listAllSensors()
        .then(function(err, data){
            assert.equal(34, err.errno);
        })
        .catch(function(){
            assert.equal(34, err.errno);
            assert.equal(undefined, data);
        });
    });
  });
});

describe('W1bus', function(){
  describe('#getValueFrom()', function(){
    it('should return an error because no sensor/probe are connected!', function(){
        var bus = w1bus.create();
        var sensorID = "28-000";
        bus.getValueFrom(sensorID)
        .then(function(err, data){
            assert.equal(34, err.errno);
        })
        .catch(function(){
            assert.equal(34, err.errno);
            assert.equal(undefined, data);
        });
    });
  });
});

