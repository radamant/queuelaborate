'use strict';

var controllers = angular.module('qlab.controllers', ["qlab.services"]);

controllers.controller('QueuePageController',  function(MopidyClient) {
  })
controllers.controller('SettingsPageController', [function() {

}]);
controllers.controller('SearchPageController', [function() {

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

controllers.controller('TracklistController', function($scope, Tracklist){
    $scope.tracklist = Tracklist;

     $scope.remove = function(track){
         Tracklist.remove(track);
     }
});

controllers.controller('SearchController', function($scope, MopidyClient, SearchResults, $rootScope, $location){
    $scope.search = function(query){
        $location.path('/search');
         var search = {any: query.phrase};
         var uris = ["spotify:"]
         MopidyClient.library.search(search, uris).then(function(results){
             SearchResults.load(results[0]);
             $rootScope.$digest();
         });
    }
})

controllers.controller('SearchResultsController', function($scope, SearchResults, MopidyClient){
    $scope.results = SearchResults;
    $scope.queue = function(item){
        MopidyClient.tracklist.add(null, null, item.uri);
    };
});

controllers.controller('SettingsController', function($scope, MopidyConfiguration){
    $scope.settings = MopidyConfiguration;
    $scope.save = function(config){
        MopidyConfiguration.setWebSocketUrl(config.webSocketUrl);
    }
})
