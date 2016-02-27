'use strict';

app.controller('tabRoleCtrl', function($scope, rhServices, serverConf, $state) {

  var filterBarPlugin = {
    init: function(scope, grid) {
      filterBarPlugin.scope = scope;
      filterBarPlugin.grid = grid;
      $scope.$watch(function() {
        var searchQuery = "";
        angular.forEach(filterBarPlugin.scope.columns, function(col) {
          if (col.visible && col.filterText) {
            var filterText = (col.filterText.indexOf('*') == 0 ? col.filterText.replace('*', '') : "^" + col.filterText) + ";";
            searchQuery += col.displayName + ": " + filterText;
          }
        });
        return searchQuery;
      }, function(searchQuery) {
        filterBarPlugin.scope.$parent.filterText = searchQuery;
        filterBarPlugin.grid.searchProvider.evalFilter();
      });
    },
    scope: undefined,
    grid: undefined
  };

  $scope.mySelections = [];

  $scope.roles = [];

  $scope.gridRoleOptions = {
    data: 'roles',
    enableRowSelection: true,
    enableCellEditOnFocus: false,
    enableColumnResize: true,
    multiSelect:false,
    selectedItems:$scope.mySelections,
    afterSelectionChange: onRowSelected,
    plugins: [filterBarPlugin],
    columnDefs: [{
      field: 'cargo',
      displayName: "Roles",
      width: '100%',
      enableCellEdit: false,
      headerClass: "header-center",
      cellClass:'text-left'
    }]
  };

  $scope.modulos = [];

  function init() {
    rhServices.getRoles(serverConf.CPANEL_WS, function(response) {
      $scope.roles = response.data;
    });

    getModulos();
  }

  function onRowSelected() {
    if ($scope.mySelections && $scope.mySelections.length > 0) {
      var rol = $scope.mySelections[0];
      $state.transitionTo('role.modifica', {idRol: rol.idRol});
    }
  }

  function getModulos() {
    rhServices.getModulos(serverConf.CPANEL_WS, function(response) {
      $scope.modulos = response.data;
      $scope.hideLoader();
    }, function() {
      $scope.modulos = [];
      $scope.hideLoader();
    });
  }

  $scope.addRole = function() {
    $state.transitionTo('role.adiciona');
  };

  init();
});
