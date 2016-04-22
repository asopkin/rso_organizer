var fp498Controllers = angular.module('fp498Controllers', []);

fp498Controllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

fp498Controllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);

/** Organization list **/
fp498Controllers.controller('OrganizationListController', ['$scope' , '$http', 'Organizations', '$window' , function($scope, $http, Organizations, $window) {

 Organizations.get().success(function(data){
    $scope.organizations = data;
  });
 $scope.option = {
  name: 'member'
 };

}]);
/** Member List **/
fp498Controllers.controller('StudentListController', ['$scope' , '$http', 'Students', '$window' , function($scope, $http, Students, $window) {

 Students.get().success(function(data){
    $scope.students = data;
  });

}]);

/** Event list controller **/
fp498Controllers.controller('EventListController', ['$scope', '$http', 'Events', 'Organizations', '$window' , function($scope, $http, Events, Organizations, $window) {

  Events.get().success(function(data){
    $scope.events = data;
  });

  Organizations.get().success(function(data){
    $scope.organizations = data;
  });

  $scope.searchOrganizations = function (row) {
      return !!((row.name.indexOf($scope.query || '') !== -1));
  };

  $scope.search = function (row) {
      return !!((row.name.indexOf($scope.query || '') !== -1 || row.description.indexOf($scope.query || '') !== -1 || row.date.indexOf($scope.query || '') !== -1));
  };

  /** slider **/
  $(document).ready(function () {
    $('.crsl').slick({
        centerMode: true,
        centerPadding: '3px',
        autoplay: true,
        autoplaySpeed: 1000,
        dots: true, /* Just changed this to get the bottom dots navigation */
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 2,
        arrows: true
    });
  });


}]);




fp498Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };

}]);
