'use strict';

/* Directives */


var directives = angular.module('qlab.directives', []);
directives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
}]);

directives.directive('searchForm', function(){
    return {
        controller: 'SearchController',
        templateUrl: 'partials/search-form.html'
    }
})

directives.directive('albumCover', function($http){
    return {
        scope: {
            info: '='
        },
        link: function(scope, element, attrs){
            var url = "https://embed.spotify.com/oembed/?url=" + scope.info.uri + "&callback=JSON_CALLBACK";
            $http.jsonp(url).success(function(data, status, headers, config){
                scope.thumbnail = data.thumbnail_url
            });
        },
        restrict: 'E',
        template:'<img src="{{thumbnail}}" />'
    }
})
