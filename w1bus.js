/*!
 * Monitoring
 * Copyright(c) 2014 Arnaud Jouobel <arnaud.joubel@gmail.com>
 * MIT Licensed
 */

 /**
 * Module dependencies.
 */
var Q = require('q'),
	fs = require('fs');

/**
 * Version.
 */
exports.version = '0.1.0';


/**
 * Create W1bus object and return it
 *
 * @api public
 */
exports.create = function() {
    return new W1bus();
};




/**
 * W1bus constructor.
 *
 * @api public
 */
function W1bus () {
	var self=this;
	self.sensors_=null;
	/**
	 * 1 Wire family 
	 * Description are translated from http://fr.wikipedia.org/wiki/1-Wire
	 *
	 var config = {
		sensor_id: {
			description: "desc",
			measures: {
				measure_type: {
					description: "Measure description",
					pattern: /value=(\d+)/,
					unit: "°C",
					scale: 0.001
				}
			}
		}
	 }
	 */
	self.w1BusFamily_ = {
		10: { 
			description: "Thermometer",
			measures:{
				temperature: {
					description: "Temperature",
					pattern: /t=(\d+)/,
					unit:"°C",
					scale: 0.001
				}
			}
		},
		22: { 
			description: "Digital thermometer",
			measures:{
				temperature: {
					description: "Temperature",
					pattern: /t=(\d+)/,
					unit:"°C",
					scale: 0.001
				}
			}
		},
		28: { 
			description: "Temperature sensor with adjustable resolution",
			measures:{
				temperature: {
					description: "Temperature",
					pattern: /t=(\d+)/,
					unit:"°C",
					scale: 0.001
				}
			}
		}
	};
};

/**
 * Return module config used by node-monitoring module
 *
 * @api public
 */
W1bus.prototype.getConfig = function() {
	var self=this;
	return self.w1BusFamily_;
};

/**
 *	Check if given sensors id is connected/available
 *
 * @param {Object} sensor ID
 * @api public
 */
W1bus.prototype.isConnected = function(sensorID) {
	var self=this;
    var deferred = Q.defer(); 
	self.getValueFrom(sensorID)
	.then(function(data){
		if(!isNaN(data.result.value)){
  			deferred.resolve({err:null, connected:true});
  		}
  		else{
			deferred.reject({err:new Error("Sensor "+sensorID+" not connected!"), connected:false});
  		}
	})
	.catch(function(err){
		deferred.reject(err);
	});
    return deferred.promise;
};

/**
 * List all sensors available one the 1 wire bus
 * Return a promise (idsList)
 *
 * @api public
 */
W1bus.prototype.listAllSensors = function() {
	var self=this;
    var deferred = Q.defer(); 
    fs.readFile('/sys/bus/w1/devices/w1_bus_master1/w1_master_slaves', 'utf8', function (err, data) {
		if (err) {
      		deferred.reject(err);
		} else {
			var parts = data.split("\n");
			parts.pop();
  			deferred.resolve({err:null, ids:parts});
		}
	});
    return deferred.promise;
};

/**
 * Get value from sensor
 * Return a promise (result{timestamp, value})
 *
 * @param {Object} sensor ID
 * @param {Object} optional measure type, such as 'temperature'
 * @api public
 */
W1bus.prototype.getValueFrom = function(sensorID, opt_measureType) {
	var self=this;
    var deferred = Q.defer(); 
	var matchArray = sensorID.match(/(\d+)-/);
	var family = matchArray[1];
    fs.readFile('/sys/bus/w1/devices/' + sensorID + '/w1_slave', 'utf8', function (err, data) {
		if (err) {
			deferred.reject(err);
		} else {
			var output = undefined;
			var measureType = opt_measureType;
			if(!measureType){
				for (var firstType in self.w1BusFamily_[family].measures) break;
				measureType = firstType;
			}
			output = self.w1BusFamily_[family].measures[measureType].pattern.exec(data);

			if (output) {
				var value = output[1] * self.w1BusFamily_[family].measures.temperature.scale;	
			 	var result = {
			 		timestamp: Date.now(),
			 		value: value
			 	};
	  			deferred.resolve({err:null, result:result});
			}
			else{
				deferred.reject(new Error('Can not read temperature for sensor ' + sensorID));
			}
		}
	});
    return deferred.promise;
};




