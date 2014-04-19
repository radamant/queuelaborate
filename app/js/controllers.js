'use strict';

/* Controllers */

var controllers = angular.module('qlab.controllers', ["qlab.services"]);
controllers.controller('QueuePageController',  function(MopidyEngine) {
      console.log(MopidyEngine);
  })
controllers.controller('SettingsPageController', [function() {

}]);

controllers.controller('PlaybackController', function($scope, MopidyEngine){
    $scope.play = function(){
        MopidyEngine.playback.play();
    }
    $scope.pause = function(){
        MopidyEngine.playback.pause();
    }
    $scope.next = function(){
        MopidyEngine.playback.next();
    };
    $scope.previous = function(){
        MopidyEngine.playback.previous();
    }

});
