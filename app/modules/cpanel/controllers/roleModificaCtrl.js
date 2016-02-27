'use strict';

app.controller('roleModificaCtrl', function($scope, $stateParams, rhServices, serverConf, $filter) {
  $scope.editarHabilitado = true;
  var idRol = $stateParams.idRol;

  $scope.permisos = [];
  $scope.permisosAsinados = [];

  $scope.configuracionDeRoles = {
    moduloSeleccionado: undefined
  };

  $scope.permisosAsignadosFiltrados = [];
  $scope.permisosFiltrados = [];

  var cellTemplateRem = '<button id="verPermisos"type="button" height="5" class="btn btn-default" ng-click="removerModulo(row)" style="cursor: pointer;" data-placement="bottom" title="Ver Permisos">' +
    '<span class="glyphicon glyphicon-minus"></span></button>';

  var cellTemplateAdd = '<button id="verPermisos"type="button" height="5" class="btn btn-default" ng-click="adicionarModulo(row)" style="cursor: pointer;" data-placement="bottom" title="Ver Permisos">' +
    '<span class="glyphicon glyphicon-plus"></span></button>';


  $scope.gridPermisosAsignados = {
    data: 'permisosAsignadosFiltrados',
    enableRowSelection: false,
    enableCellSelection:false,
    multiSelect:false,
    selectedItems: $scope.mySelections,
    columnDefs: [
      {
        field: 'detalle',
        displayName: "Roles Asignados",
        width: '80%',
        headerClass: "header-center",
        cellClass: "text-left",
        sortable: true
      },
      { displayName:"",
        cellTemplate: cellTemplateRem,
        width: '15%',
        enableCellEdit: false }
    ]
  };

  $scope.gridPermisosPorModulo = {
    data: 'permisosFiltrados',
    enableRowSelection: false,
    enableCellSelection:false,
    multiSelect:false,
    selectedItems: $scope.mySelections,
    columnDefs: [
      {
        field: 'detalle',
        displayName: "Roles",
        width: '80%',
        headerClass: "header-center",
        cellClass: "text-left",
        sortable: true
      },
      { displayName:"",
        cellTemplate: cellTemplateAdd,
        width: '15%',
        enableCellEdit: false
      }
    ]
  };

  function init () {
    $scope.showLoader();
    rhServices.getPermisos(serverConf.CPANEL_WS, function(response) {
      $scope.permisos = response.data;
      console.log("------------PERMISOS--------------");
      console.log($scope.permisos);
      obtenerPermisosAsignados();
    }, function() {
      $scope.hideLoader();
    });
  }

  function obtenerPermisosAsignados () {
    rhServices.getPermisosPorRol(idRol, serverConf.CPANEL_WS, function(response) {
      $scope.hideLoader();
      $scope.permisosAsignados = response.data;
      console.log("-------------permisosAsinados-------------");
      console.log($scope.permisosAsignados);
    }, function() {
      $scope.hideLoader();
    });
  }

  $scope.cambioModulo = function (modulo) {
    if (modulo) {
      $scope.permisosAsignadosFiltrados = $filter('filter')($scope.permisosAsignados, function (permiso) {
        return permiso.admModulo.idModulo === modulo.idModulo;
      });

      $scope.permisosFiltrados = $filter('filter')($scope.permisos, function (permiso) {
        return permiso.admModulo.idModulo === modulo.idModulo;
      });
      console.log($.extend({},true,$scope.permisosFiltrados));
      $scope.permisosFiltrados = $filter('filter')($scope.permisosFiltrados, function (permiso) {
        return !verificarPermisoYaAsignado(permiso);
      });
      console.log($.extend({},true,$scope.permisosFiltrados));
    } else {
      $scope.permisosAsignadosFiltrados = [];
      $scope.permisosFiltrados = [];
    }

    if (!$scope.$$phase) {
      $scope.$digest();
    }
  };

  function verificarPermisoYaAsignado (permiso) {
    //console.log("--------------------------");
    //console.log("--------------------------");
    var permisosAsignados = $scope.permisosAsignadosFiltrados,
      encontrado = false;

    for (var i = 0; permisosAsignados && !encontrado && i < permisosAsignados.length; i++) {
      //console.log(permisosAsignados[i].idPermiso + ' - ' + permiso.idPermiso);
      if (permisosAsignados[i].idPermiso === permiso.idPermiso) {
        encontrado = true;
        break;
      }
    }

    //console.log(encontrado);
    return encontrado;
  }

  $scope.removerModulo = function (row) {
    //console.log(row);
    if (!row) {
      return;
    }
    $scope.permisosAsignados = $filter('filter')($scope.permisosAsignados, function (permiso) {
      return permiso.idPermiso !== row.entity.idPermiso;
    });

    $scope.cambioModulo($scope.configuracionDeRoles.moduloSeleccionado);
  };

  $scope.adicionarModulo = function (row) {

  };

  init();
});

