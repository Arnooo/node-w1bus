/*!
 * Monitoring
 * Copyright(c) 2014 Arnaud Jouobel <arnaud.joubel@gmail.com>
 * MIT Licensed
 */

 /**
 * Module dependencies.
 */
var sense = require('ds18b20'),
    Q = require('q');

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

var w1BusFamily = {
	28:"Temperature sensor"
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
W1bus.prototype.getValueFrom = function(sensorID, processValue) {
	var self=this;
    var deferred = Q.defer(); 
	sense.temperature('28-000005866d48', function(err, value) {
		if(!err && value){
		 	console.log('Current temperature is', value);
		 	var result = {
		 		timestamp: Date.now(),
		 		value: value
		 	};
  			deferred.resolve(err, result);
		}
		else{
			deferred.reject(err);
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
	sense.sensors(function(err, ids) {
		if(!err){
			self.sensors_=ids;
	  		console.log(ids);
  			deferred.resolve(err, ids);
		}
		else{
      		deferred.reject(err);
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

