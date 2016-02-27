/**
 * Created by VLADY on 13/01/2015.
 */

angular.module('myApp')
  .factory('localStorage', ['localStorageService',
    function (localStorageService) {
      function supportedLocalStorage () {
        if ( localStorageService.isSupported ) {
          return localStorageService;
        } else if (localStorageService.cookie.isSupported){
          return localStorageService.cookie;
        } else {
          // todo: confirm but it's sure the app always has a type of local storage.
          return null;
        }
      }

      var LocalStorage = function () {
        this.localStorage = supportedLocalStorage();
      };

      LocalStorage.prototype = {
        set : function (key, value) {
          return this.localStorage.set(key,value);
        },
        get: function (key) {
          return this.localStorage.get(key);
        },
        remove : function (key) {
          return this.localStorage.remove(key);
        },
        clearAll : function () {
          return localStorageService.clearAll();
        }
      };

      return new LocalStorage();
    }]);
