var fp498Controllers = angular.module('fp498Controllers', ['720kb.datepicker', 'jshor.angular-addtocalendar']);
var baseUrl = "http://localhost:4000";

/** profile **/
fp498Controllers.controller('profileController', ['$scope', '$rootScope', '$http', '$location', 'Organizations', 'Students', '$location', '$route', function($scope, $rootScope, $http, $location, Organizations, Students, $location, $route) {
   $scope.profile = false;
   console.log("profile");
   if($rootScope.user){
    $scope.user = $rootScope.user;
//    console.log($scope.user);
    }
   if($scope.user){
    $scope.profile = true;

//       console.log($scope.user);
       $scope.orgNames = [];
       for(var k in $scope.user.followOrganizationID){
        Organizations.getOne($scope.user.followOrganizationID[k]).success(function(data){
          $scope.orgNames.push(data);
          console.log(data.name);
        })
       }
    }

   $scope.options = {
    dormVal: true
   };

   $scope.$watch('options.dormVal', function(changed) {
      console.log("watch");
    });
    $scope.changeUserInfo = function(netidparam, org, userid, emailVal){
    if(emailVal==false){
      Organizations.getOne(org).success(function(data){
        $scope.fixedOrg = data;
        var idx = $scope.fixedOrg.emails.indexOf(userid);
        $scope.fixedOrg.emails.splice(idx, 1);
        Organizations.put($scope.fixedOrg._id, $scope.fixedOrg).success(function(data){
//          console.log(data.emails);
        })
      })
    }
    else if(emailVal==true){
        Organizations.getOne(org).success(function(data){
        $scope.fixedOrg = data;
        $scope.fixedOrg.emails.push(userid);
        Organizations.put($scope.fixedOrg._id, $scope.fixedOrg).success(function(data){
//          console.log(data.emails);
        })
      })
    }
   };

   $scope.unfollowOrg = function(netidparam, org, userid){
      Organizations.getOne(org).success(function(data){
        $scope.fixedOrg = data;
        var idx = $scope.fixedOrg.members.indexOf(userid);
        $scope.fixedOrg.members.splice(idx, 1);
        Organizations.put($scope.fixedOrg._id, $scope.fixedOrg).success(function(data){
//          console.log(data.members);
          Students.getOne(userid).success(function(data){
            $scope.fixedStudent = data;
//            console.log($scope.fixedStudent.followOrganizationID);
            var idx = $scope.fixedStudent.followOrganizationID.indexOf(org);
            $scope.fixedStudent.followOrganizationID.splice(idx, 1);
//            console.log($scope.fixedStudent.followOrganizationID);
            Students.put($scope.fixedStudent._id, $scope.fixedStudent).success(function(data){
//              console.log($scope.fixedStudent);
              $rootScope.user = data;
              $route.reload();
            })
          })
        })
      })
   };


   $scope.userLogout = function(){
    $rootScope.user = null;
    console.log("set to none");

    $location.path('/home');
   };
   /**
   $http.get(baseUrl + '/api/profile').success(function(data) {
    console.log("roseeey");
    console.log(data);
    console.log(data.error);
    console.log(data.user);
    if(!data.error) {
      $scope.profile = true;
      $scope.user = data.user;
    }

   });**/

 }]);



fp498Controllers.controller('LoginController', ['$scope', '$rootScope', 'CommonData' , '$http', '$location', function($scope, $rootScope, CommonData, $http, $location) {
  $scope.data = "";
  $scope.newStudent = {
      netId: "",
      password: "",
      name: "",
      followOrganizationID: []
  };
  $scope.thisUser = {
    email: "",
    password: ""
  };
  $scope.submitLogin = function(){
//  console.log($scope.newStudent);
  $http.post(baseUrl + '/api/login', $scope.newStudent).success(function(data){
    console.log("got user");
//    console.log(data.user);
    //res.redirect('/profile');
    $rootScope.user = data.user;
    console.log("root");
//    console.log($rootScope.user);
//    console.log($rootScope.user['local']);
    $location.path('/profile');
  })
  }

}]);

fp498Controllers.controller('SignupController', ['$scope', '$rootScope', 'CommonData', 'Organizations', '$http', '$location', function($scope, $rootScope, CommonData, Organizations, $http, $location) {
  Organizations.get().success(function(data){
    $scope.orgs = data;
    console.log($scope.orgs);
    console.log($scope.orgs[0].name);
  })

  $scope.data = "";
  $scope.newStudent = {
      netId: "",
      password: "",
      name: "",
      followOrganizationID: []
  };
  $scope.newUser = {
    email: "",
    password: ""
  }
  $scope.submitSignup = function(){
  console.log($scope.newStudent);
  $http.post(baseUrl + '/api/signup', $scope.newStudent).success(function(data){
    console.log("got user");
    console.log(data.user);
    //res.redirect('/profile');
    $rootScope.user = data.user;
    $location.path('/profile');
  })
  }

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

/** Org controller **/
fp498Controllers.controller('OrgFeedController', ['$scope', '$http', '$timeout', 'Events', 'Organizations', '$window' , function($scope, $http, $timeout, Events, Organizations, $window) {

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

    $scope.searchOrganizations = function (row) {
      var caseInsensitive = row.name.toLowerCase();
      if($scope.query){
        return !!((caseInsensitive.indexOf($scope.query.toLowerCase() || '') !== -1));
      }
      else{
        return !!((caseInsensitive.indexOf($scope.query || '') !== -1));
      }
    };
   /** names and icons **/ 
  $scope.getCategoryName = function(raw_name){
    raw_name = String(raw_name);
    return raw_name.replace('"', '');
  }
 $scope.getIcon = function(cat_name){
  cat_name = String(cat_name);
  if(cat_name=="social"){
    return "users";
  }
  else if(cat_name=="professional"){
    return "briefcase";
  }
  else if(cat_name=="active"){
    return "stethoscope";
  }
  else if(cat_name=="greek"){
    return "trophy";
  }
  else{
    return "globe";
  }
 }   
 $scope.option = {
  name: 'member'
 };


}]);

/** Org detail controller **/
fp498Controllers.controller('OrganizationDetailController', ['$scope', '$http', '$timeout', 'Events', 'Organizations', 'Students', '$window' , '$routeParams', '$rootScope', '$location', function($scope, $http, $timeout, Events, Organizations, Students, $window, $routeParams, $rootScope, $location) {
  $scope.orgid = $routeParams.orgID;
  Organizations.getOne($scope.orgid).success(function(data){
    $scope.organization = data;
  });
  $scope.followOrg = function(orgID){
    console.log(orgID);
    console.log($rootScope.user);
    var tgtID = $rootScope.user._id;
    Students.getOne(tgtID).success(function(data){
      console.log("got student");
      $scope.tgtUser = data;
      $scope.tgtUser.followOrganizationID.push(orgID);
      Students.put(tgtID, $scope.tgtUser).success(function(data){
        console.log("mod student");
        $scope.modifiedUser = data;
        Organizations.getOne(orgID).success(function(data){
          $scope.tgtOrg = data;
          $scope.tgtOrg.members.push(tgtID);
          Organizations.put(orgID, $scope.tgtOrg).success(function(data){
            console.log("org updated");
            console.log(data);
            $rootScope.user = $scope.modifiedUser;
            $location.path('/profile');
          })
        })
      })
    })

  }
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
fp498Controllers.controller('EventListController', ['$scope', '$http', '$timeout', 'Events', 'Organizations', '$window' ,  '$location', function($scope, $http, $timeout, Events, Organizations, $window, $location) {

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

/** Event detail controller **/
fp498Controllers.controller('EventDetailController', ['$scope', '$http', '$timeout', 'Events', 'Organizations', '$window' , '$routeParams', function($scope, $http, $timeout, Events, Organizations, $window, $routeParams) {
  $scope.eventId = $routeParams.eventID;
  console.log("ey");
  console.log($scope.eventId);
  Events.getOne($scope.eventId).success(function(data){
    $scope.event = data;
    console.log('wat');
    console.log(data);
    
    var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    googleCalendarUrl += '&text=' + encodeURIComponent($scope.event.name);
    googleCalendarUrl += '&dates=' + '20150704T190000' + '/' + '20150704T190000';
    googleCalendarUrl += '&details=' + encodeURIComponent($scope.event.description);
    googleCalendarUrl += '&location=' + 'Battery+Park+City,+New+York,+NY';
    console.log(googleCalendarUrl);
    $scope.gCal = googleCalendarUrl;
  });
  function gCal(){
    console.log('g cal');
    console.log(googleCalendarUrl);
    if(googleCalendarUrl){
      window.open(googleCalendarUrl);
      return googleCalendarUrl;
    }
    else{
      return "";
    }
  }
}]);




fp498Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = "http://localhost:4000";

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = "http://localhost:4000";
    $scope.displayText = "URL set";

  };

}]);
