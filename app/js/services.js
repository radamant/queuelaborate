'use strict';

/* Services */


var services = angular.module('qlab.services', []);

services.value('version', '0.1');

services.factory('MopidyConfiguration', ['$location', function(location){
    var config = {};
    var serverName = location.search().server;

    if(serverName){
        config.webSocketUrl = "ws://" + serverName + ":6680/mopidy/ws/";
    }

    return config;
}]);

var _mopidy = {};
services.factory('MopidyEngine', function(MopidyConfiguration){
    var mopidy = new Mopidy(MopidyConfiguration);
    var enableDebugging = function(){
        _mopidy = mopidy;
        mopidy.on(console.log.bind(console));
    }

    enableDebugging();

    mopidy.on("state:online", function(){
        mopidy.tracklist.setConsume(true);
    });

    return mopidy;
})
