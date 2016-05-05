var app=angular.module("mp4",["ngRoute","fp498Controllers","fp498Services"]);app.config(["$routeProvider",function($routeProvider){$routeProvider.when("/login",{templateUrl:"partials/login.html",controller:"LoginController"}).when("/signup",{templateUrl:"partials/signup.html",controller:"SignupController"}).when("/settings",{templateUrl:"partials/settings.html",controller:"SettingsController"}).when("/home",{templateUrl:"partials/organizationlist.html",controller:"OrgFeedController"}).when("/organizations",{templateUrl:"partials/organizationlist.html",controller:"OrganizationListController"}).when("/organizations/display/:orgID",{templateUrl:"partials/orgdetail.html",controller:"OrganizationDetailController"}).when("/organizations/edit/:orgID",{templateUrl:"partials/editorg.html",controller:"OrganizationEditController"}).when("/students",{templateUrl:"partials/studentlist.html",controller:"StudentListController"}).when("/events",{templateUrl:"partials/eventlist.html",controller:"EventListController"}).when("/events/display/:eventID",{templateUrl:"partials/eventdetail.html",controller:"EventDetailController"}).when("/addstudent",{templateUrl:"partials/addstudent.html",controller:"StudentAddController"}).when("/profile",{templateUrl:"partials/profile.html",controller:"profileController"}).when("/leader",{templateUrl:"partials/profileleader.html",controller:"leaderController"}).when("/addorganization",{templateUrl:"partials/addorganization.html",controller:"AddOrganizationController"}).otherwise({redirectTo:"/events"})}]);