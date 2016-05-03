var fp498Controllers = angular.module('fp498Controllers', ['720kb.datepicker', 'jshor.angular-addtocalendar']);

fp498Controllers.controller('LoginController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

fp498Controllers.controller('SignupController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);

/** Home controller **/
fp498Controllers.controller('HomeController', ['$scope', '$http', '$timeout', 'Events', 'Organizations', '$window' , function($scope, $http, $timeout, Events, Organizations, $window) {

  Events.get().success(function(data){
    $scope.events = data;
    $timeout(function() {
    console.log(data);
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
      }, 200);
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
    $(document).ready(function(){
      $("#calendar").kendoCalendar();
  });



}]);

/** Organization list **/
fp498Controllers.controller('OrganizationListController', ['$scope' , '$http', '$timeout', 'Organizations', '$window' , function($scope, $http, $timeout, Organizations, $window) {
 $scope.categories = [];
 Organizations.get().success(function(data){
    $scope.organizations = data;
      for(var k in $scope.organizations){
        for(var l in $scope.organizations[k].category){
          if($scope.categories.indexOf($scope.organizations[k].category[l])==-1){
            $scope.categories.push($scope.organizations[k].category[l]);
          }
        }
      }
  });
  $scope.catFilter = function(value){
      console.log("cat filter");
      $scope.myFilter = {category: value};
    }

   document.getElementById("addorg").onclick = function () {
          location.href = "/#/addorganization";
    }
 $scope.option = {
  name: 'member'
 };

}]);

/** Add Organization **/
fp498Controllers.controller('AddOrganizationController', ['$scope' , '$http', 'Organizations', '$window' , function($scope, $http, Organizations, $window) {
   $scope.newOrg = {
      name: "",
      description: "",
      category: [],
      leaders: [],
      members: [],
      events: []
    };

  /** When form submitted, post the new user **/
  $scope.submitForm = function(){
    /** Post the user **/
    console.log("submit form");
    Organizations.post($scope.newOrg).success(function(data){
      $scope.users = data.data;
      var frm = document.getElementById("add-org-form");
      frm.reset();
    })
    .error(function(err){
      console.log(err);
    })
  } //end submit form function

}]);

/** Member List **/
fp498Controllers.controller('StudentListController', ['$scope' , '$http', 'Students', '$window' , function($scope, $http, Students, $window) {

 Students.get().success(function(data){
    $scope.students = data;
  });

}]);

/* Filter for netids */
fp498Controllers.filter('netIdFilter', function() {
    return function(input) {
        if(input!=null){
          return input.replace(/ /g, '_');
        }
    }
});

/** Add Student List **/
fp498Controllers.controller('StudentAddController', ['$scope' , '$http', 'Students', '$window' , function($scope, $http, Students, $window) {

 Students.get().success(function(data){
    $scope.students = data;
  });

}]);



/** Event list controller **/
fp498Controllers.controller('EventListController', ['$scope', '$http', '$timeout', 'Events', 'Organizations', '$window' , function($scope, $http, $timeout, Events, Organizations, $window) {

  Events.get().success(function(data){
    $scope.events = data;
    $timeout(function() {
    console.log(data);
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
      }, 200);
  });

  Organizations.get().success(function(data){
    $scope.organizations = data;
  });

  $scope.searchEvents = function (row) {
      return !!((row.name.indexOf($scope.query || '') !== -1));
  };

  $scope.search = function (row) {
      return !!((row.name.indexOf($scope.query || '') !== -1 || row.description.indexOf($scope.query || '') !== -1 || row.date.indexOf($scope.query || '') !== -1));
  };

  /** slider **/
    $(document).ready(function(){
      $("#calendar").kendoCalendar();
  });



}]);

var dateParse = function(value) {
  console.log('ey');
  var dateObject = new Date(value);
  console.log(dateObject);
  console.log("gimme");
  return dateObject.getMonth();
};



/** profile **/
fp498Controllers.controller('profileController', ['$scope', '$http', function($scope, $http) {
   $scope.profile = false;
   console.log("profile");
   $http.get('/#/profile').success(function(data) {
    console.log(data);
    console.log(data.user);
    if(!data.error) {
      $scope.profile = true;
      $scope.user = data.user;
    }

   });
 }]);


fp498Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = "http://localhost:4000";

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = "http://localhost:4000";
    $scope.displayText = "URL set";

  };

}]);
