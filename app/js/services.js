'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', []);
services.value('version', '0.1');

services.factory('mopidyConfiguration', ['$location', function(location){
    var config = {};
    var serverName = location.search().server;

    if(serverName){
        config.webSocketUrl = "ws://" + serverName + ":6680/mopidy/ws";
    }

    return config;
}]);