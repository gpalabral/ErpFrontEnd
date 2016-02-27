'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
var app = angular
  .module('myApp', [
    // app configurations modules
    'appConfiguration',
    'filters',
    //libraries, vendor
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule',
    'snap',
    'adaptv.adaptStrap',
    'ngGrid',
    //modules
    'angular-tree-grid',
    'pdf',
    'ngCsv',
    'ui.utils.masks',
    'ngFileUpload'
  ])
  .config(function (localStorageServiceProvider) {
    //set custom configuration for local storage.
    localStorageServiceProvider
      .setPrefix('app')
      .setStorageType('localStorage')
      .setNotify(true, true)
  })
  .config(function(snapRemoteProvider) {
    //snapRemoteProvider.globalOptions.disable = 'right';
    //set custom configuration for snap behaviour.
    snapRemoteProvider.globalOptions = {
      disable: 'right'
    }
  })
  .config(['$adConfigProvider', function ($adConfigProvider) {
    $adConfigProvider.iconClasses.collapse = 'fa fa-minus fa-lg';
    $adConfigProvider.iconClasses.expand = 'fa fa-plus fa-lg';
  }])
  .config(function ($httpProvider) {
    //$httpProvider.responseInterceptors.push('errorHttpInterceptor');
    $httpProvider.interceptors.push('errorInterceptor');
  });


function generateModel (json, finalJson) {
  var enableToShow = false;
  if( !finalJson ) {
    enableToShow = true;
  }
  finalJson = finalJson || {};
  var prop;

  for ( var key in json ) {
    if ( json.hasOwnProperty(key) ) {
      prop = json[key];
      finalJson[key] = {};

      if ( prop && typeof prop  === 'object' && !prop.push ) {
        finalJson[key]['type'] = 'object';
        finalJson[key]['fields'] = {};

        generateModel ( prop, finalJson[key]['fields'] );
      } else {
        finalJson[key]['required'] = true;
        //finalJson[key]['id'] = null;

        if ( typeof prop === 'number' ) {
          finalJson[key]['type'] = 'number';
          finalJson[key]['value'] = prop||null;
        } else if ( typeof prop === 'boolean' ) {
          finalJson[key]['type'] = 'boolean';
          finalJson[key]['value'] = !!prop;
        } else if ( typeof prop === 'string' ) {
          finalJson[key]['type'] = 'string';
          finalJson[key]['value'] = prop||"";
        } else if ( prop && typeof prop === 'object' ) {
          if( typeof prop[0] === 'object' ) {
            finalJson[key]['type'] = 'array';
            finalJson[key]['subType'] = 'object';
            finalJson[key]['minLength'] = 0;
            finalJson[key]['fields'] = {};
            generateModel( prop[0], finalJson[key]['fields']);
            //finalJson[key]['value'] = prop||[];
          } else {
            finalJson[key]['type'] = 'array';
            finalJson[key]['value'] = prop||[];
          }
        }
      }
    }
  }
  if ( enableToShow ) {
    console.log( JSON.stringify(finalJson, null, 4) );
  }
}