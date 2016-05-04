var fp498Controllers=angular.module("fp498Controllers",["720kb.datepicker","jshor.angular-addtocalendar"]),baseUrl="http://localhost:4000";fp498Controllers.controller("profileController",["$scope","$rootScope","$http","$location",function($scope,$rootScope,$http,$location){$scope.profile=!1,console.log("profile"),console.log($scope.user),$rootScope.user&&($scope.user=$rootScope.user,console.log($scope.user)),$scope.user&&($scope.profile=!0)}]),fp498Controllers.controller("LoginController",["$scope","$rootScope","CommonData","$http","$location",function($scope,$rootScope,CommonData,$http,$location){$scope.data="",$scope.newStudent={netId:"",password:"",name:"",followOrganizationID:[]},$scope.thisUser={email:"",password:""},$scope.submitLogin=function(){console.log($scope.newStudent),$http.post(baseUrl+"/api/login",$scope.newStudent).success(function(data){console.log("got user"),console.log(data.user),$rootScope.user=data.user,console.log("root"),console.log($rootScope.user),console.log($rootScope.user.local),$location.path("/profile")})}}]),fp498Controllers.controller("SignupController",["$scope","$rootScope","CommonData","$http","$location",function($scope,$rootScope,CommonData,$http,$location){$scope.data="",$scope.newStudent={netId:"",password:"",name:"",followOrganizationID:[]},$scope.newUser={email:"",password:""},$scope.submitSignup=function(){console.log($scope.newStudent),$http.post(baseUrl+"/api/signup",$scope.newStudent).success(function(data){console.log("got user"),console.log(data.user),$rootScope.user=data.user,$location.path("/profile")})}}]),fp498Controllers.controller("HomeController",["$scope","$http","$timeout","Events","Organizations","$window",function($scope,$http,$timeout,Events,Organizations,$window){Events.get().success(function(data){$scope.events=data,$timeout(function(){console.log(data),$(".crsl").slick({centerMode:!0,centerPadding:"3px",autoplay:!0,autoplaySpeed:1e3,dots:!0,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:2,arrows:!0})},200)}),Organizations.get().success(function(data){$scope.organizations=data}),$scope.searchOrganizations=function(row){return!(-1===row.name.indexOf($scope.query||""))},$scope.search=function(row){return!(-1===row.name.indexOf($scope.query||"")&&-1===row.description.indexOf($scope.query||"")&&-1===row.date.indexOf($scope.query||""))},$(document).ready(function(){$("#calendar").kendoCalendar()})}]),fp498Controllers.controller("OrgFeedController",["$scope","$http","$timeout","Events","Organizations","$window",function($scope,$http,$timeout,Events,Organizations,$window){Events.get().success(function(data){$scope.events=data,$timeout(function(){console.log(data),$(".crsl").slick({centerMode:!0,centerPadding:"3px",autoplay:!0,autoplaySpeed:1e3,dots:!0,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:2,arrows:!0})},200)}),Organizations.get().success(function(data){$scope.organizations=data}),$scope.searchOrganizations=function(row){return!(-1===row.name.indexOf($scope.query||""))},$scope.search=function(row){return!(-1===row.name.indexOf($scope.query||"")&&-1===row.description.indexOf($scope.query||"")&&-1===row.date.indexOf($scope.query||""))},$(document).ready(function(){$("#calendar").kendoCalendar()})}]),fp498Controllers.controller("OrganizationListController",["$scope","$http","$timeout","Organizations","$window",function($scope,$http,$timeout,Organizations,$window){$scope.categories=[],Organizations.get().success(function(data){$scope.organizations=data;for(var k in $scope.organizations)for(var l in $scope.organizations[k].category)-1==$scope.categories.indexOf($scope.organizations[k].category[l])&&$scope.categories.push($scope.organizations[k].category[l])}),$scope.catFilter=function(value){console.log("cat filter"),$scope.myFilter={category:value}},document.getElementById("addorg").onclick=function(){location.href="/#/addorganization"},$scope.option={name:"member"}}]),fp498Controllers.controller("OrganizationDetailController",["$scope","$http","$timeout","Events","Organizations","$window","$routeParams",function($scope,$http,$timeout,Events,Organizations,$window,$routeParams){$scope.orgid=$routeParams.orgID,Organizations.getOne($scope.orgid).success(function(data){$scope.organization=data})}]),fp498Controllers.controller("AddOrganizationController",["$scope","$http","Organizations","$window",function($scope,$http,Organizations,$window){$scope.newOrg={name:"New Organization",description:"web-programming",category:[],leaders:[],members:[],events:[]},$scope.submitForm=function(){console.log("submit form"),Organizations.post($scope.newOrg).success(function(data){$scope.users=data.data;var frm=document.getElementById("add-org-form");frm.reset()}).error(function(err){console.log(err)})}}]),fp498Controllers.controller("StudentListController",["$scope","$http","Students","$window",function($scope,$http,Students,$window){Students.get().success(function(data){$scope.students=data})}]),fp498Controllers.filter("netIdFilter",function(){return function(input){return null!=input?input.replace(/ /g,"_"):void 0}}),fp498Controllers.controller("StudentAddController",["$scope","$http","Students","$window",function($scope,$http,Students,$window){Students.get().success(function(data){$scope.students=data})}]),fp498Controllers.controller("EventListController",["$scope","$http","$timeout","Events","Organizations","$window","$location",function($scope,$http,$timeout,Events,Organizations,$window,$location){Events.get().success(function(data){$scope.events=data,$timeout(function(){console.log(data),$(".crsl").slick({centerMode:!0,centerPadding:"3px",autoplay:!0,autoplaySpeed:1e3,dots:!0,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:2,arrows:!0})},200)}),Organizations.get().success(function(data){$scope.organizations=data}),$scope.searchEvents=function(row){return!(-1===row.name.indexOf($scope.query||""))},$scope.search=function(row){return!(-1===row.name.indexOf($scope.query||"")&&-1===row.description.indexOf($scope.query||"")&&-1===row.date.indexOf($scope.query||""))},$(document).ready(function(){$("#calendar").kendoCalendar()})}]),fp498Controllers.controller("EventDetailController",["$scope","$http","$timeout","Events","Organizations","$window","$routeParams",function($scope,$http,$timeout,Events,Organizations,$window,$routeParams){$scope.eventId=$routeParams.eventID,console.log("ey"),console.log($scope.eventId),Events.getOne($scope.eventId).success(function(data){$scope.event=data,console.log("wat"),console.log(data);var googleCalendarUrl="https://www.google.com/calendar/render?action=TEMPLATE";googleCalendarUrl+="&text="+encodeURIComponent($scope.event.name),googleCalendarUrl+="&dates=20150704T190000/20150704T190000",googleCalendarUrl+="&details="+encodeURIComponent($scope.event.description),googleCalendarUrl+="&location=Battery+Park+City,+New+York,+NY",console.log(googleCalendarUrl),$scope.gCal=googleCalendarUrl})}]),fp498Controllers.controller("SettingsController",["$scope","$window",function($scope,$window){$scope.url="http://localhost:4000",$scope.setUrl=function(){$window.sessionStorage.baseurl="http://localhost:4000",$scope.displayText="URL set"}}]);