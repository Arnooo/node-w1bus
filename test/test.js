var assert = require("assert"),
    w1bus = require("../w1bus");

describe('W1bus', function(){
  describe('#create()', function(){
    it('should return an object!', function(){
      assert.equal("object", typeof(w1bus.create()));
    });
  });
});

describe('W1bus', function(){
  describe('#listAllSensors()', function(){
    it('should return a list of all sensors! Check sensors connection!', function(done){
        var bus = w1bus.create();
        bus.listAllSensors()
        .then(function(err, data){
            if(err){
                throw err;
            }
            console.log(err);
            console.log(data);
            done();
        });
    });
  });
});
