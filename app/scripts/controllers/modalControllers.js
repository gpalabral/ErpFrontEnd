'use strict';

app.controller('modal1', function ($scope,$modalInstance, modalOptions, tempCache) {
  $scope.modalOptions = modalOptions;
  $scope.modelSelected = null;

  function init () {
    $scope.treeConfig = {
      collection : modalOptions.tree,
      childrenField : 'children',
      iconExpanded : 'fa fa-angle-down',
      iconCollapsed : 'fa fa-angle-right',
      onClickRow : $scope.modalOptions.elementSelected,
      collapseElements : true,
      padding : 30,
      enableHeader : true,
      colDefinition : [
        { field : 'descripcion', displayName : 'Descripcion', treeField : true },
        { field : 'mascaraGenerada', displayName : 'Mascara Generada' }
      ]
    };

    $scope.hideLoader();
  }


  $scope.expandAll = function () {
    $scope.treeConfig ? $scope.treeConfig.controls.expandAll() : null;
  };

  $scope.collapseAll = function () {
    $scope.treeConfig ? $scope.treeConfig.controls.collapseAll() : null;
  };

  $scope.modalOptions.ok = function () {
    $modalInstance.close($scope.modelSelected);
  };

  $scope.modalOptions.close = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.modalOptions.elementSelected = function (model) {
    if ( model ) {
      tempCache['idEntidadSeleccionada'] = model.idEntidad;
      $scope.modelSelected = model;
    } else {
      tempCache['idEntidadSeleccionada'] = '';
      $scope.modelSelected = {};
    }
  };

  init();
});

app.controller('modalDelete', function ($scope,$modalInstance, modalOptions) {
  $scope.modalOptions = modalOptions;

  $scope.modalOptions.ok = function () {
    $modalInstance.close($scope.modelSelected);
  };

  $scope.modalOptions.close = function () {
    $modalInstance.dismiss('cancel');
  };

});