var assert = require("assert"),
    w1bus = require("../w1bus");

//--------------------------------------------------------------------------------
// test cases - testing for success
//
describe('W1bus', function(){
  describe('#create()', function(){
    it('should return an object!', function(){
        var bus = w1bus.create();
        assert.equal("object", typeof(bus));
    });
  });
});

describe('W1bus', function(){
  describe('#listAllSensors()', function(){
    it('should be a list with at least one sensor ID!', function(done){
        var bus = w1bus.create();
        bus.listAllSensors()
        .then(function(data){
            try{
                assert.ok(data.ids.length >= 1);
                assert.equal(null, data.err);
                done();
            }
            catch(err){
                done(err);
            }
        })
        .catch(function(err){
            assert.equal(-1, err.err.errno);
            done();
        })    
        .done(null, done);
    });
  });
});

describe('W1bus', function(){
  describe('#getValueFrom()', function(){
    it('should return an object with a timestamp and a value, corresponding to a sensors value at a datetime.', function(done){
        var bus = w1bus.create();
        bus.listAllSensors()
        .then(function(data){
            try{
                assert.ok(data.ids.length >= 1);
                assert.equal(null, data.err);

                bus.getValueFrom(data.ids[0])
                .then(function(res){
                    try{
                        assert.equal(null, res.err);
                        assert.ok(!isNaN(res.result.value));
                        assert.equal(typeof(1), typeof(res.result.value));
                        assert.ok(!isNaN(res.result.timestamp));
                        assert.equal(typeof(1), typeof(res.result.timestamp));
                        assert.ok(res.result.timestamp > 0);

                        done();
                    }
                    catch(err){
                        done(err);
                    }
                })
                .catch(function(err){
                    assert.equal(-1, err.err.errno);
                    done();
                })
                .done(null, done);
            }
            catch(err){
                done(err);
            }
        })
        .catch(function(err){
            assert.equal(-1, err.errno);
                done();
        })
        .done(null, done);
    });
  });
});
