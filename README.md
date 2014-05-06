node-w1bus
===============

Simple node module to manage all sensor on 1-Wire bus

## Installation

    npm install node-w1bus

    sudo modprobe wire
    sudo modprobe w1-gpio
    sudo modprobe w1-therm

## Usage

Sensor's Configuration schema:

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

How to instanciate a 1 wire bus object:

    var bus = w1bus.create();

How to get 1 wire bus configuration with all sensors and measures available:

    var config = bus.getConfig();

How to get all sensors connected on this bus:

    bus.listAllSensors()
    .then(function(data){
        console.log(data);
    });

How to check if a sensor if connected:

    bus.isConnected(data.ids[0])
    .then(function(data){
        console.log(data.connected);
    });

How to get a sensor measure:

    var mySensor = "28-00000000";
    var opt_measureType = "temperature";
    bus.getValueFrom(mySensor, opt_measureType)
    .then(function(res){
        console.log(res);
    });

## Compatibilities

1 Wire sensors compatibilities (Description translated from http://fr.wikipedia.org/wiki/1-Wire):

    DS18S20 - Thermometer
    DS1822 - Digital thermometer
    DS18B20 - Temperature sensor with adjustable resolution

## Tests

In order to perform unit test without any sensors/probes, run:

    make simu

If you want to perform unit test with real sensors/probes conencted, run:

    make live

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.2 Add sensors configuration + isConnected method
* 0.1.1 Bug fix
* 0.1.0 Initial release
