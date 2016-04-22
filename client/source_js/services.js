var fp498Services = angular.module('fp498Services', []);

fp498Services.factory('CommonData', function(){
    var data = "";
    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        }
    }
});

fp498Services.factory('Events', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/events');
        },

        getOne : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/events/'+id);
        },

        post : function(event){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/events', event);
        }, 

        put : function(id, event){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl + '/api/events/'+ id, event); 
        },

        delete : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/events/' + id);
        }
    }
});

/** Organizations **/
fp498Services.factory('Organizations', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/organizations');
        },

        getOne : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/organizations/'+id);
        },

        post : function(organization){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/organizations', organization);
        }, 

        put : function(id, organization){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl + '/api/organizations/'+ id, organization); 
        },

        delete : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/organizations/' + id);
        }
    }
});

/** Students **/
fp498Services.factory('Students', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/students');
        },

        getOne : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/students/'+id);
        },

        post : function(student){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/students', student);
        }, 

        put : function(id, student){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl + '/api/students/'+ id, student); 
        },

        delete : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/students/' + id);
        }
    }
});
