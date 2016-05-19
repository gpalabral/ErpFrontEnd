/**
 * Created by VLADY on 27/01/2015.
 */

(function () {
  angular.module('myApp')
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider
        .otherwise('/login');

      $stateProvider
        .state('login', {
          url : '/login',
          views : {
            '' : {
              templateUrl : 'modules/demostracionSenapi/views/listaSenapi.html',
              controller : 'listaSenapiCtrl'
            }
          }
        })
        .state('menuBap', {
          url: '/menuBap',
          views: {
            '': {
              templateUrl: 'modules/userControl/views/menuPrincipal.html',
              controller: 'menuPrincipalCtrl'
            }
          }
        })
        .state('contabilidad', {
          url : '/contabilidad',
          views : {
            '' : {
              templateUrl : 'views/mainView.html',
              controller : 'mainViewCtrl'
            }
          }
        })
        .state('pdfViewer', {
          url : '/pdfViewer/:idFacturaEmitida',
          views : {
            '' : {
              templateUrl : 'views/pdfViewer.html',
              controller : 'pdfViewerCtrl'
            }
          }
        })
        .state('splashScreen', {
          url: '/splashView',
          views: {
            '': {
              template: '<div></div>'
            }
          }
        });
    }])
})();
