node-w1bus
===============

Simple node module to manage all sensor on 1-Wire bus

## Installation

    npm install node-w1bus

## Usage

    var bus = w1bus.create();
    bus.listAllSensors()
    .then(function(data){
        console.log(data);
        bus.getValueFrom(data.ids[0])
        .then(function(res){
            console.log(res);
        });
    });

## Compatibilities

1 Wire sensors compatibilities (Description translated from http://fr.wikipedia.org/wiki/1-Wire):

    DS18S20 - Thermometer
    DS1822 - Digital thermometer
    DS18B20 - Temperature sensor with adjustable resolution

## Tests

In order to perform unit test without any sensors/probes, run:

    make test

If you want to perform unit test with real sensors/probes conencted, run:

    make live

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.1 Initial release
