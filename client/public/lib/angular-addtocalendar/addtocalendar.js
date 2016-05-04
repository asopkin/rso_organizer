/**
 * angular-addtocalendar v1.1.3
 * An AngularJS directive for adding an event to calendar apps.
 *
 * Controller and directive.
 */
'use strict';

angular
  .module('jshor.angular-addtocalendar', [])
  .config([
    '$compileProvider',
    function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(http(s)?|data):/);
    }
  ])
  .controller('AddtocalendarCtrl', ['$scope',
    function ($scope) {


      $scope.description = $scope.description || '';

      /**
       * Renders a .ics file and downloads it to the client browser.
       * The name of the file will be the event title with alphanumeric chars
       * having the extension `.ics`.
       *
       * @param  {Boolean} encodeUri  encode the
       * @return {String}  ics calendar data
       */
      function getIcsCalendar(encodeUri) {

        function formatIcsText(s, maxLength) {
          if (!s || !s.length) return s;
          return wrap(s.replace(/\n/g, '\\n'), maxLength);
        }

        function wrap(s, maxLength) {
          if (!maxLength) maxLength = 75;
          if (!s || s.length <= maxLength) {
            return s;
          } else {
            return s.substring(0, maxLength).replace(/\n/g, '\\n') + "\r\n " + wrap(s.substring(maxLength), 75);
          }
        }

        var elements = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'CLASS:PUBLIC',
          'DESCRIPTION:' + formatIcsText($scope.description, 62),
          'DTSTART:' + $scope.startDate,
          'DTEND:' + $scope.endDate,
          'LOCATION:' + formatIcsText($scope.location, 64),
          'SUMMARY:' + formatIcsText($scope.title, 66),
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'END:VCALENDAR'
        ];

        return elements.join('\n');

      }

      /**
       * Generates a url to add event to Yahoo! Calendar.
       *
       * @return {String} yahoo cal url
       */
      function getYahooCalendarUrl() {

        var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
        yahooCalendarUrl += '&title=' + encodeURIComponent($scope.title);
        yahooCalendarUrl += '&st=' + encodeURIComponent($scope.startDate) + '&et=' + encodeURIComponent($scope.endDate);
        yahooCalendarUrl += '&desc=' + encodeURIComponent($scope.description);
        yahooCalendarUrl += '&in_loc=' + encodeURIComponent($scope.location);

        return yahooCalendarUrl;

      };

      /**
       * Generates a url to add event to Google Calendar.
       *
       * @return {String} google cal url
       */
      function getGoogleCalendarUrl() {
          var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
          googleCalendarUrl += '&text=' + encodeURIComponent($scope.title);
          googleCalendarUrl += '&dates=' + encodeURIComponent($scope.startDate) + '/' + encodeURIComponent($scope.endDate);
          googleCalendarUrl += '&details=' + encodeURIComponent($scope.description);
          googleCalendarUrl += '&location=' + encodeURIComponent($scope.location);
          console.log('ey gcal');
          console.log($scope.title);
          return googleCalendarUrl;
      };

      /**
       * Generates a url to add event to Windows Live Calendar.
       *
       * @return {String} microsoft cal url
       */
      function getMicrosoftCalendarUrl() {

        var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
        microsoftCalendarUrl += '&summary=' + encodeURIComponent($scope.title);
        microsoftCalendarUrl += '&dtstart=' + encodeURIComponent($scope.startDate) + '&dtend=' + encodeURIComponent($scope.endDate);
        microsoftCalendarUrl += '&description=' + encodeURIComponent($scope.description);
        microsoftCalendarUrl += '&location=' + encodeURIComponent($scope.location);

        return microsoftCalendarUrl;

      };

      function x(){
        console.log("run x");
        var getGcal = getGoogleCalendarUrl();
        console.log('my cal');
        console.log(getGcal);
        return getGcal;
      }

      function dlIcal() {

        // render safe filename for iCal (only \w chars) based on event title
        var fileName = $scope.title.replace(/[^\w ]+/g, '') + '.ics';

        download(getIcsCalendar(), fileName, 'application/octet-stream');

      }

        $scope.calendarUrl = {
          microsoft: getMicrosoftCalendarUrl(),
          google: getGoogleCalendarUrl(),
          yahoo: getYahooCalendarUrl(),
          icalendar: getIcsCalendar(),
          dlIcal: dlIcal
        };

    }

  ])
  .directive('addtocalendar', function () {

    return {

      restrict: 'E',
      scope: {
        startDate: '@',
        endDate: '@',
        title: '@',
        description: '@',
        location: '@',
        className: '@',
        btnText: '@'
      },
      controller: 'AddtocalendarCtrl',
      template: '\
      <div class="btn-group" dropdown on-toggle="toggled(open)">\
	      <span\
	      	ng-class="className || \'btn btn-sm btn-default dropdown-toggle\'"\
	      	dropdown-toggle>\
	      	{{btnText || \'\'}} <span class="caret"></span>\
	      </span>\
	      <ul class="dropdown-menu">\
		      <li><a href="{{calendarUrl.google}}" target="_blank">Add to Calendar</a></li>\
	      </ul>\
      </div>'
    };

  });
