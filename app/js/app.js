'use strict';


// Declare app level module which depends on filters, and services
angular.module('qlab', [
  'ngRoute',
  'qlab.filters',
  'qlab.services',
  'qlab.directives',
  'qlab.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/queue', {templateUrl: 'partials/queue.html', controller: 'QueuePageController'});
  $routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: 'SettingsPageController'});
  $routeProvider.otherwise({redirectTo: '/queue'});
}]);
