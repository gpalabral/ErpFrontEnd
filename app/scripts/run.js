/**
 * Created by VLADY on 08/01/2015.
 */

(function () {
  'use strict';
  angular.module('myApp')
    .run(function($rootScope,localStorage,$http,$location,Server, menuModulo,localStorageService,$timeout,
                  userControlService, $state, userPermission, appConfig){

      var sessionTimeout = null,
        //sessionLimit = 300000; // test expire into 5 minutes
        //sessionLimit = 43200000; // expires into twelve hours
        sessionLimit = 7200000;

      // set data by default for server
      Server.initServer();
      /**
       * headerMenu handle which menu is gonna be shown in the header according to module selected.
       * @type {*|{}}
       */
      $rootScope.moduloSeleccionado = menuModulo['menu'][localStorageService.get('module')];
      /**
       * User data get local storage user data to validate if user is saved in local storage.
       * @type {*|{}}
       */
      $rootScope.userData = localStorageService.get('user');
      var defaultStatus = !!appConfig['DEV_ENVIRONMENT'];
      $rootScope.specialPermission = {
        anulacionFacturas: defaultStatus,
        eliminacionPlanilla: defaultStatus
      };

      if( $rootScope.userData && $rootScope.userData.modulos ) {
        userPermission.setPermissions($rootScope.userData.modulos);
        $rootScope.specialPermission = userPermission.setSpecialPermission($rootScope.userData);
      }

      function controlIndexCache () {
        var params = {};
        var headers = {};
        if (localStorage.get("index-last-modified")){ //set the required headers to get 304 if file not changed
          headers = {
            "If-Modified-Since" : localStorage.get("index-last-modified"),
            "If-None-Match": localStorage.get("index-etag")
          }
        }

        //request index.html from the server
        $http({method: "GET", url: "index.html", cache: false, params: params, headers: headers}).
          success(function(data, status, headers, config) {
            if ((localStorage.get("index-etag"))&&(localStorage.get("index-etag") != headers()['etag'])){
              //after detecting a new etag, redirect to / to reload index.html
              //then redirect to path stored in a variable
              $location.path("/");
              location.reload();
              //$rootScope.newVersionDetectedPath = a; //path to be redirected to (see homeControlCtrl.js)
              //$rootScope.getAboutDetailInfo(); //reloading the application version
              console.log("ETAG changed - reloading the app");
            }
            localStorage.set("index-last-modified",headers()['last-modified']);
            localStorage.set("index-etag",headers()['etag']);

          }).
          error(function(data, status) {
            console.log('Error checking index.html - status: ' + status);
          });
      }

      // handle all behaviours when star a transition.
      $rootScope.$on('$locationChangeStart', function (){
        controlIndexCache();
      });

      $rootScope.initSessionWatcher = function() {
        var signedIn = !!localStorageService.get('user');
        if( signedIn ) {
          initSessionWatcher();
        }
      };

      $rootScope.logout = function () {
        userControlService.logout('','POST', function () {
          $rootScope.moduloSeleccionado = undefined;
          $rootScope.userData = undefined;
          $state.go('login');
          $rootScope.cancelSessionWatcher();
        });
      };

      function initSessionWatcher() {
        sessionTimeout = $timeout(function(){
          var currentTs = new Date().getTime();
          var signedInTS = localStorageService.get('signedInTS');

          if( (currentTs - signedInTS) >= sessionLimit ) {
            $rootScope.logout();
          }
          var signedIn = !!localStorageService.get('user');
          if( signedIn ) {
            initSessionWatcher();
          }
        }, 1000);
      }

      $rootScope.cancelSessionWatcher = function() {
        if( sessionTimeout ) {
          $timeout.cancel(sessionTimeout);
        }
      };

      $rootScope.initSessionWatcher();

    });
})();
