/**
 * Created by RENAN on 04/03/2015.
 */

'use strict';

app.controller('menuPrincipalCtrl', function ($scope, $state, cxpService, serverConf, $http, $modal, sharingData,
                                              localStorageService, MODULES, $rootScope, menuModulo, $location) {

    // always pass by this controller when app gets loaded to validate user's permission.
    function init () {
        var userData = localStorageService.get('user'),
          permissions = userData['modulos'];

        localStorageService.set('permissions', permissions);

        asignarVisibilidadDeModulos(sharingData.mainMenu, permissions);
        $scope.userModulePermission = sharingData.mainMenu;

        if( $location.$$path.indexOf('menuBap') > -1 ) {
            localStorageService.set('module',undefined);
            $rootScope.moduloSeleccionado = undefined;
        } else {
            var moduleCode = localStorageService.get('module') || 'CXP';
            $rootScope.moduloSeleccionado = menuModulo['menu'][moduleCode];
            //$rootScope.moduloSeleccionado = menuModulo['menu'][localStorageService.get('module') || 'CXP'];
        }
    }

    function asignarVisibilidadDeModulos ( userModulePermission, permissions) {
        var module, i;
        for ( i = 0; permissions && userModulePermission && i < userModulePermission.length; i++ ) {
            module = userModulePermission[i];
            //module.permission = permissions.indexOf( module.code ) > -1;
            module.permission = permissions.hasOwnProperty( module.code );
        }
    }

    $scope.showModalTipoCambio = function (forceReload) {
        localStorageService.set('module',MODULES.CXP);
        $rootScope.moduloSeleccionado = menuModulo['menu'][localStorageService.get('module') || 'CXP'];
        $state.go('paginaInicialTipoCambio',{},{reload:!!forceReload});
    };

    $scope.showModalTipoCambioCxC = function (forceReload) {
        localStorageService.set('module',MODULES.CXC);
        $rootScope.moduloSeleccionado = menuModulo['menu'][localStorageService.get('module') || 'CXP'];
        $state.go('paginaInicialTipoCambio',{},{reload:!!forceReload});
    };

    $scope.cuentasPorCobrar = function (forceReload) {
        localStorageService.set('module',MODULES.CXC);
        $rootScope.moduloSeleccionado = menuModulo['menu'][localStorageService.get('module') || 'CXP'];
        $state.go('cxcEnBlanco',{},{reload:!!forceReload});
    };

    $scope.cpanel = function (module) {
        localStorageService.set('module',MODULES.CPANEL);
        $rootScope.moduloSeleccionado = menuModulo['menu'][localStorageService.get('module') || 'CXP'];
        $state.go('usuarios');
    };

    $scope.recursosHumanos = function(module) {
        localStorageService.set('module',MODULES.RH);
        $rootScope.moduloSeleccionado = menuModulo['menu'][localStorageService.get('module') || 'CXP'];
        $state.go('paginaInicialRecursosHumanos',{},{reload:!!module});
        //$state.go('paginaInicialRecursosHumanos');
        //$state.go('rhEnBlanco');
    };

    $scope.onSelectModule = function (module, forceReload) {
        if ( module.hasOwnProperty('customEvent') && $scope[module['customEvent']] ) {
            $scope[module['customEvent']](forceReload);
        }
    };

    init();
});
