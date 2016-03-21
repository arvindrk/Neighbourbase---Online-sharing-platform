'use strict';

angular.module('angularSmoothscroll', []).directive('smoothScroll', [
  '$log', '$timeout', '$window', function($log, $timeout, $window) {
    /*
        Retrieve the current vertical position
        @returns Current vertical position
        */

        var currentYPosition, elmYPosition, smoothScroll;
        currentYPosition = function() {
          if ($window.pageYOffset) {
            return $window.pageYOffset;
          }
          if ($window.document.documentElement && $window.document.documentElement.scrollTop) {
            return $window.document.documentElement.scrollTop;
          }
          if ($window.document.body.scrollTop) {
            return $window.document.body.scrollTop;
          }
          return 0;
        };
    /*
        Get the vertical position of a DOM element
        @param eID The DOM element id
        @returns The vertical position of element with id eID
        */

        elmYPosition = function(eID) {
          var elm, node, y;
          elm = document.getElementById(eID);
          if (elm) {
            y = elm.offsetTop;
            node = elm;
            while (node.offsetParent && node.offsetParent !== document.body) {
              node = node.offsetParent;
              y += node.offsetTop;
            }
            return y;
          }
          return 0;
        };
    /*
        Smooth scroll to element with a specific ID without offset
        @param eID The element id to scroll to
        @param offSet Scrolling offset
        */

        smoothScroll = function(eID, offSet) {
          var distance, i, leapY, speed, startY, step, stopY, timer, _results;
          startY = currentYPosition();
          stopY = elmYPosition(eID) - offSet;
          distance = (stopY > startY ? stopY - startY : startY - stopY);
          if (distance < 100) {
            scrollTo(0, stopY);
            return;
          }
          speed = Math.round(distance / 100);
        if (true) { //speed>=20
          speed = 20;
        }
        step = Math.round(distance / 25);
        leapY = (stopY > startY ? startY + step : startY - step);
        timer = 0;
        if (stopY > startY) {
          i = startY;
          while (i < stopY) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY += step;
            if (leapY > stopY) {
              leapY = stopY;
            }
            timer++;
            i += step;
          }
          return;
        }
        i = startY;
        _results = [];
        while (i > stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY -= step;
          if (leapY < stopY) {
            leapY = stopY;
          }
          timer++;
          _results.push(i -= step);
        }
        return _results;
      };
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          return element.bind('click', function() {
            var offset;
            if (attr.target) {
              offset = attr.offset || 100;
            // $log.log('Smooth scroll: scrolling to', attr.target, 'with offset', offset);
            return smoothScroll(attr.target, offset);
          } else {
            // return $log.warn('Smooth scroll: no target specified');
          }
        });
        }
      };
    }
    ]).directive('smoothScrollJquery', [
    '$log', function($log) {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          return element.bind('click', function() {
            var offset, speed, target;
            if (attr.target) {
              offset = attr.offset || 100;
              target = $('#' + attr.target);
              speed = attr.speed || 500;
            // $log.log('Smooth scroll jQuery: scrolling to', attr.target, 'with offset', offset, 'and speed', speed);
            return $('html,body').stop().animate({
              scrollTop: target.offset().top - offset
            }, speed);
          } else {
            // $log.log('Smooth scroll jQuery: no target specified, scrolling to top');
            return $('html,body').stop().animate({
              scrollTop: 0
            }, speed);
          }
        });
        }
      };
    }
    ]);

    var app = angular.module('app',['angularSmoothscroll','ui.router']);
///////////////////////////////////////////////////////////HOME CONTROLLER///////////////////////////////////////////////////////////////////
app.controller('homeController', ['$scope','$http','$location',
  function($scope,$http,$location,$cookieStore,appConfig) {
    $scope.setActive = function(data) {
      if(data == 0){
        $scope.home=true;$scope.about=false;$scope.contact=false;$scope.help=false;$scope.login=false;$scope.sign=false;$scope.listing=false;$scope.howitworks=false;
      }
      else if(data == 1){
        $scope.home=false;$scope.about=true;$scope.contact=false;$scope.help=false;$scope.login=false;$scope.sign=false;$scope.listing=false;$scope.howitworks=false;
      }
      else if(data == 2){
        $scope.home=false;$scope.about=false;$scope.contact=true;$scope.help=false;$scope.login=false;$scope.sign=false;$scope.listing=false;$scope.howitworks=false;
      }
      else if(data == 3){
        $scope.home=false;$scope.about=false;$scope.contact=false;$scope.help=true;$scope.login=false;$scope.sign=false;$scope.listing=false;$scope.howitworks=false;
      }
      else if(data == 4){
        $scope.home=false;$scope.about=false;$scope.contact=false;$scope.help=false;$scope.login=true;$scope.sign=false;$scope.listing=false;$scope.howitworks=false;
        $scope.login_modal = true;
        $scope.signup = false;
      }
      else if(data == 5){
        $scope.home=false;$scope.about=false;$scope.contact=false;$scope.help=false;$scope.login=false;$scope.sign=true;$scope.listing=false;$scope.howitworks=false;
        $scope.login_modal = false;
        $scope.signup = true;
      }
      else if(data == 6){
        $scope.home=false;$scope.about=false;$scope.contact=false;$scope.help=false;$scope.login=false;$scope.sign=false;$scope.listing=true;$scope.howitworks=false;
      }
      else if(data == 7){
        $scope.home=false;$scope.about=false;$scope.contact=false;$scope.help=false;$scope.login=false;$scope.sign=false;$scope.listing=false;$scope.howitworks=true;
      }
    }
    $scope.init_modal = function(){
      var offsetTop = $(window).height()/4;
      var totHeight = $(window).height() - 60;
      $scope.modalStyle = { 'margin-top' : offsetTop };
      $scope.sliderSytle = {'height' : totHeight, 'margin-top' : '60px' };
    }
    $scope.flip = function(data){
      if(data == 0){
        $scope.borrow = true;
        $scope.lend = false;
      }
      else if(data == 1){
        $scope.borrow = false;
        $scope.lend = true;
      }
    }
  }]);