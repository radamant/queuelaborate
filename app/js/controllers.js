'use strict';

/* Controllers */

var controllers = angular.module('qlab.controllers', ["qlab.services"]);
controllers.controller('QueuePageController',  function(MopidyClient) {
  })
controllers.controller('SettingsPageController', [function() {

}]);

controllers.controller('PlaybackController', function($scope, MopidyClient){
    $scope.play = function(){
        MopidyClient.playback.play();
    }
    $scope.pause = function(){
        MopidyClient.playback.pause();
    }
    $scope.next = function(){
        MopidyClient.playback.next();
    };
    $scope.previous = function(){
        MopidyClient.playback.previous();
    }

});
