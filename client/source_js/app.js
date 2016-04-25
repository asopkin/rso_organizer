var app = angular.module('mp4', ['ngRoute', 'fp498Controllers', 'fp498Services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/firstview', {
    templateUrl: 'partials/firstview.html',
    controller: 'FirstController'
  }).
  when('/secondview', {
    templateUrl: 'partials/secondview.html',
    controller: 'SecondController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/eventlist', {
    templateUrl: 'partials/eventlist.html',
    controller: 'EventListController'
  }).
  when('/organizations', {
    templateUrl: 'partials/organizationlist.html',
    controller: 'OrganizationListController'
  }).
  when('/students', {
    templateUrl: 'partials/studentlist.html',
    controller: 'StudentListController'
  }).
  when('/addstudent', {
    templateUrl: 'partials/addstudent.html',
    controller: 'StudentAddController'
  }).
  when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'profileController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);
