/**
 * Created by VLADY on 27/01/2015.
 */
'use strict';

app.controller('grupoAltaCtrl', function ($rootScope, $scope, cxpService, serverConf, tempCache, modalService,
                                          contabilidadService, $http, $state, grupoModel) {

  var grupo = new grupoModel();

  $scope.grupo = grupo.getObject();

  var init = function () {
    conseguirContabilidadTree();

    // obteniendo los datos para par recurrencia
    cxpService.getListParRecurrencia({},{},serverConf.ERPCONTA_WS, function(response) {
      $scope.parRecurrenciaOptions = response.data;
    });
  };

  function conseguirContabilidadTree () {
    // creating table to handle "cuentas exigibles" table.
    $scope.editableInPopup = '<button id="editBtn" type="button" class="btn btn-primary" ng-click="cuentasPorPagarModal()" >Popup</button>';

    $scope.tableData = [
      { label : 'Cuentas por Pagar', numCuenta:'',descripcionCuenta:'', code:'cxp'},
      { label : 'Documentos por Pagar', numCuenta:'',descripcionCuenta:'', code:'dxp'},
      { label : 'Anticipos sobre Cuentas', numCuenta:'',descripcionCuenta:'',code:'asc'}
    ];

    $scope.btnAdiciona = '<button id="adicionaCuenta" type="button" height="5" class="btn btn-primary" ng-click="onSelectRow(row)" style="cursor: pointer;">' +
      '<span class="glyphicon glyphicon-plus"></span></button>';
    $scope.gridConf = {
      data : 'tableData',
      enableRowSelection : false,
      columnDefs : [
        { displayName : '', width: '7%', cellTemplate: $scope.btnAdiciona},
        { field: 'label', width: '25%',displayName:'Cuentas Exigibles', headerClass: "header-center"},
        { field: 'numCuenta',width: '20%',displayName:'Numero de Cuenta',  headerClass: "header-center" },
        { field: 'descripcionCuenta', displayName:'Descripcion',  headerClass: "header-center" }
      ]
    };

    contabilidadService.getList({},{gruponivel:'PCTA'},serverConf.ERPCONTA, function (respuesta) {
      $scope.contaTree = createTree(respuesta.data);

      $scope.hideLoader();
    }, function (respuestaDeError) {

    });
  }

  $scope.onSelectRow = function edit(row){
    var code = row.entity.code;
    $scope.showLoader();
    switch ( code ) {
      case 'cxp' : // Cuentas Por Pagar
        $scope.cuentasPorPagarModal(row.entity);
        break;
      case 'dxp' : // Documentos Por Pagar
        $scope.documentosPorPagarModal(row.entity);
        break;
      case 'asc' : // Anticipos Sobre Cuentas
        $scope.anticiposSobreCuentasModal(row.entity);
        break;
      default : break;
    }
  };

  $scope.guardarGrupo = function () {
    if ( grupo.validate($scope.grupo) ) {
      cxpService.adicionarGrupo($scope.grupo,{},serverConf.ERPCONTA_WS, function (respuesta) {
        $state.go('grupos.empty');
        // EXITO
        tempCache.grupoAdicionado();
      }, function (respuestaDeError){
        // ERROR
      });
    } else {
      console.log("error");
    }


    //cxpService.adicionarGrupo($scope.grupo,{},serverConf.ERPCONTA_WS, exito, error)
  };

  $scope.volver = function () {
    $state.go('grupos.empty');
  };

  $scope.cuentasPorPagarModal = function (row) {
    var modalDefaults = {
      controller : 'modal1'
    };

    var modalOptions = {
      headerText: 'Plan de cuentas',
      tree : $scope.contaTree
    };
    $scope.abrirTreeModal(modalDefaults,modalOptions,function (respuesta) {
      row.descripcionCuenta = respuesta.descripcion;
      row.numCuenta = respuesta.mascaraGenerada;
      $scope.grupo.idCntEntidadCtaXPagar = respuesta.idEntidad;
    });
  };

  $scope.documentosPorPagarModal = function (row) {
    var modalDefaults = {
      controller : 'modal1'
    };

    var modalOptions = {
      headerText: 'Plan de cuentas',
      tree : $scope.contaTree
    };

    $scope.abrirTreeModal(modalDefaults,modalOptions,function (respuesta) {
      row.descripcionCuenta = respuesta.descripcion;
      row.numCuenta = respuesta.mascaraGenerada;
      $scope.grupo.idCntEntidadDocXPagar = respuesta.idEntidad;
    });
  };

  $scope.anticiposSobreCuentasModal = function (row) {
    var modalDefaults = {
      controller : 'modal1'
    };

    var modalOptions = {
      headerText: 'Plan de cuentas',
      tree : $scope.contaTree
    };

    $scope.abrirTreeModal(modalDefaults,modalOptions,function (respuesta) {
      row.descripcionCuenta = respuesta.descripcion;
      row.numCuenta = respuesta.mascaraGenerada;
      $scope.grupo.idCntEntidadAnticipo = respuesta.idEntidad||"";
    });
  };

  init();
});
