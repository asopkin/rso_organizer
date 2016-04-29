var fp498Controllers=angular.module("fp498Controllers",["720kb.datepicker"]);fp498Controllers.controller("LoginController",["$scope","CommonData",function($scope,CommonData){$scope.data="",$scope.displayText="",$scope.setData=function(){CommonData.setData($scope.data),$scope.displayText="Data set"}}]),fp498Controllers.controller("SignupController",["$scope","CommonData",function($scope,CommonData){$scope.data="",$scope.getData=function(){$scope.data=CommonData.getData()}}]),fp498Controllers.controller("OrganizationListController",["$scope","$http","$timeout","Organizations","$window",function($scope,$http,$timeout,Organizations,$window){$scope.categories=[],Organizations.get().success(function(data){$scope.organizations=data;for(var k in $scope.organizations)for(var l in $scope.organizations[k].category)-1==$scope.categories.indexOf($scope.organizations[k].category[l])&&$scope.categories.push($scope.organizations[k].category[l])}),$scope.catFilter=function(value){console.log("cat filter"),$scope.myFilter={category:value}},document.getElementById("addorg").onclick=function(){location.href="/#/addorganization"},$scope.option={name:"member"}}]),fp498Controllers.controller("AddOrganizationController",["$scope","$http","Organizations","$window",function($scope,$http,Organizations,$window){$scope.newOrg={name:"New Organization",description:"web-programming",category:[],leaders:[],members:[],events:[]},$scope.submitForm=function(){console.log("submit form"),Organizations.post($scope.newOrg).success(function(data){$scope.users=data.data;var frm=document.getElementById("add-org-form");frm.reset()}).error(function(err){console.log(err)})}}]),fp498Controllers.controller("StudentListController",["$scope","$http","Students","$window",function($scope,$http,Students,$window){Students.get().success(function(data){$scope.students=data})}]),fp498Controllers.filter("netIdFilter",function(){return function(input){return null!=input?input.replace(/ /g,"_"):void 0}}),fp498Controllers.controller("StudentAddController",["$scope","$http","Students","$window",function($scope,$http,Students,$window){Students.get().success(function(data){$scope.students=data})}]),fp498Controllers.controller("EventListController",["$scope","$http","$timeout","Events","Organizations","$window",function($scope,$http,$timeout,Events,Organizations,$window){Events.get().success(function(data){$scope.events=data,console.log("here"),$timeout(function(){console.log(data),$(".crsl").slick({centerMode:!0,centerPadding:"3px",autoplay:!0,autoplaySpeed:1e3,dots:!0,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:2,arrows:!0})},200)}),Organizations.get().success(function(data){$scope.organizations=data}),$scope.searchOrganizations=function(row){return!(-1===row.name.indexOf($scope.query||""))},$scope.search=function(row){return!(-1===row.name.indexOf($scope.query||"")&&-1===row.description.indexOf($scope.query||"")&&-1===row.date.indexOf($scope.query||""))},$(document).ready(function(){$("#calendar").kendoCalendar()})}]),fp498Controllers.controller("profileController",["$scope","$http",function($scope,$http){$scope.profile=!1,console.log("profile"),$http.get("/profile").success(function(data){console.log(data),data.error||($scope.profile=!0,$scope.user=data.user)})}]),fp498Controllers.controller("SettingsController",["$scope","$window",function($scope,$window){$scope.url="http://localhost:4000",$scope.setUrl=function(){$window.sessionStorage.baseurl="http://localhost:4000",$scope.displayText="URL set"}}]);