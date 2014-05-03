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
