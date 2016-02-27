/**
 * Created by VLADY on 27/01/2015.
 */

'use strict';

app.controller('grupoListCtrl', function ($rootScope,$scope,$state,cxpService,serverConf, tempCache) {

  // definicon de variables
  $scope.grupos = [];

  var init = function () {
    cxpService.getList( {}, {}, serverConf.ERPCONTA_WS, function (response) {
      $scope.grupos = response.data;
    });

  };

  $scope.addGrupo = function () {
    $state.go('grupos.alta');
  };

  tempCache.grupoAdicionado = function () {
    init();
  };

  $scope.viewGroupDetail = function (grupo) {
    tempCache.grupoInfo = grupo;
    $state.go('grupos.detalle',{idGrupo:grupo.idGrupo});
  };

  init();
});
