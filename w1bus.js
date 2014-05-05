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
 * 1 Wire family 
 * Description are translated from http://fr.wikipedia.org/wiki/1-Wire
 */
var w1BusFamily = {
	10: { 
		description: "Thermometer",
		pattern: /t=(\d+)/
	},
	22: { 
		description: "Digital thermometer",
		pattern: /t=(\d+)/
	},
	28: { 
		description: "Temperature sensor with adjustable resolution",
		pattern: /t=(\d+)/
	}
};

/**
 * W1bus constructor.
 *
 * @api private
 */
function W1bus () {
	var self=this;
	self.sensors_=null;
};

/**
 * Get value from sensor
 * Return a promise (result{timestamp, value})
 *
 * @param {Object} sensor ID
 * @api private
 */
W1bus.prototype.getValueFrom = function(sensorID) {
	var self=this;
    var deferred = Q.defer(); 
	var matchArray = sensorID.match(/(\d+)-/);
	var family = matchArray[1];
    fs.readFile('/sys/bus/w1/devices/' + sensorID + '/w1_slave', 'utf8', function (err, data) {
		if (err) {
			deferred.reject(err);
		} else {
			var output = w1BusFamily[family].pattern.exec(data);
			if (output) {
				var value = output[1] / 1000;	
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

/**
 * List all sensors available one the 1 wire bus
 * Return a promise (idsList)
 *
 * @api private
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
 *	Check if given sensors id is connected/available
 *
 * @param {Object} sensor ID
 * @api private
 */
W1bus.prototype.isConnected = function(sensorID) {
	return true;
};

