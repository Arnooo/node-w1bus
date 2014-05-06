var assert = require("assert"),
    w1bus = require("../w1bus");

//--------------------------------------------------------------------------------
// test cases - testing common API between simulation and live
//
describe('W1bus', function(){
  describe('#create()', function(){
    it('should return an object!', function(){
      assert.equal("object", typeof(w1bus.create()));
    });
  });
});

describe('W1bus', function(){
  describe('#getConfig()', function(){
    it('should return a config matching\n'+    
        'var config = {\n'+
        '  sensor_id: {\n'+
        '    description: \"desc\",\n'+
        '    measures: {\n'+
        '      temperature: {\n'+
        '        description: \"Temperature measure\",\n'+
        '        pattern: /t=(\d+)/,\n'+
        '        unit: \"°C\",\n'+
        '        scale: 0.001\n'+
        '      }\n'+
        '    }\n'+
        '  }\n'+
        '}!',
    function(){
      var bus = w1bus.create();
      var config = bus.getConfig();
      for(var sensor in config){
        console.log("Sensor ID = "+sensor);
        for(var param1 in config[sensor]){
            assert.ok((param1 === "description" ||
                      param1 === "measures"),
                       "Unknown sensor parameter: "+param1);
        }
        assert.ok(config[sensor].measures);
        for(var meas in config[sensor].measures){
          for(var param2 in config[sensor].measures[meas]){
              assert.ok((param2 === "description" ||
                        param2 === "pattern" ||
                        param2 === "unit" ||
                        param2 === "scale"),
                         "Unknown measure parameter: "+param2);
          }
          console.log("Measure = "+meas);
          assert.ok(config[sensor].measures[meas].description);
          assert.ok(config[sensor].measures[meas].pattern);
          assert.ok(config[sensor].measures[meas].unit);
          assert.ok(config[sensor].measures[meas].scale);
        }
      }
    });
  });
});


