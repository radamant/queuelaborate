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
services.factory('MopidyClient', function(MopidyConfiguration){
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

services.factory('Tracklist', function(MopidyClient, $rootScope){
    var that = {
        tracks: [],
        remove: function(track){
            var filter = {uri: [track.uri]};
            MopidyClient.tracklist.remove(filter);
        }
    }

    var refreshTracklist = function(){
        MopidyClient.tracklist.getTracks().then(function(newTracklist){
            that.tracks = newTracklist;
            $rootScope.$digest();
        });
    };

    MopidyClient.on("event:tracklistChanged", refreshTracklist)
    MopidyClient.on("state:online", refreshTracklist)

    return that;
})

services.factory('SearchResults', function(){
    var that = {
        artists:[],
        albums:[],
        tracks: [],

        load: function(results){
            that.artists = results.artists;
            that.albums = results.albums;
            that.tracks = results.tracks;
        }
    }
    return that;
})
