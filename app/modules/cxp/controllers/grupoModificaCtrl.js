'use strict';

app.controller('grupoModificaCtrl', function ($scope, tempCache, cxpService, serverConf, $state, contabilidadService, $timeout) {
    //$scope.grupo = tempCache.grupoInfo;

    $scope.activaBotonGuarda = false;
    $scope.activaBotonModifica = true;


    $scope.activaMensajeConfirmado = false;
    $scope.activaMensajeErroneo = false;

    $scope.listaConceptoPorGrupo = [];

    $scope.muestraAlerta = function (valor) {
        $scope.activaMensajeConfirmado = valor;
        $scope.activaMensajeErroneo = !valor;
        $timeout(function () {
            $scope.activaMensajeConfirmado = false;
            $scope.activaMensajeErroneo = false;
        }, 2000);
    };


    var parametros = {
        "idCppGrupo": tempCache.idGrupo != null ? tempCache.idGrupo : null
    };

    $scope.readOnlyEnable = true;
    function init() {
        // obteniendo los datos para par recurrencia
        console.info("ID GRUPO INIT:",tempCache.idGrupo);
        if (tempCache.idGrupo != null) {
            console.info("SIIIIII");
            cxpService.getListParRecurrencia({}, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.parRecurrenciaOptions = response.data;
            });
            cxpService.getGrupoPorId({}, parametros, serverConf.ERPCONTA_WS, function (response) {
                console.info("ENTROOOOOOOOOOOOOOO");
                $scope.grupo = response.data;
                console.log(JSON.stringify($scope.grupo, null, 4));
                //cxpService.getCuentasExigibles({}, {}, $scope.grupo.idCntEntidadAnticipo, serverConf.ERPCONTA_WS, function (response) {
                //    $scope.CntEntidadAnticipo = response.data;
                //    $scope.tableData.push({
                //        label: 'Cuentas Por Pagar',
                //        numCuenta: $scope.CntEntidadAnticipo.mascara,
                //        descripcionCuenta: $scope.CntEntidadAnticipo.descripcion,
                //        code: 'cxp'
                //    });
                //});
                //cxpService.getCuentasExigibles({}, {}, $scope.grupo.idCntEntidadCtaXPagar, serverConf.ERPCONTA_WS, function (response) {
                //    $scope.CntEntidadCtaXPagar = response.data;
                //    $scope.tableData.push({
                //        label: 'Documentos Por Pagar',
                //        numCuenta: $scope.CntEntidadCtaXPagar.mascara,
                //        descripcionCuenta: $scope.CntEntidadCtaXPagar.descripcion,
                //        code: 'dxp'
                //    });
                //});
                //cxpService.getCuentasExigibles({}, {}, $scope.grupo.idCntEntidadDocXPagar, serverConf.ERPCONTA_WS, function (response) {
                //    $scope.CntEntidadDocXPagar = response.data;
                //    $scope.tableData.push({
                //        label: 'Anticipos Sobre Cuentas',
                //        numCuenta: $scope.CntEntidadDocXPagar.mascara,
                //        descripcionCuenta: $scope.CntEntidadDocXPagar.descripcion,
                //        code: 'asc'
                //    });
                //});


                cxpService.getConceptoAll({}, {}, serverConf.ERPCONTA_WS, function (response) {
                    $scope.listaConceptoPorGrupo = response.data;

                });
            });
        } else {
            console.info("NOOOOO");
        }

    }

    function ngGridConfig() {
        $scope.editableInPopup = '<button id="editBtn" type="button" class="btn btn-primary" ng-click="cuentasPorPagarModal()" >Popup</button>';

        $scope.tableData = [];

        $scope.btnAdiciona = '<button id="adicionaCuenta" type="button" height="5" class="btn btn-primary" ng-click="onSelectRow(row)" style="cursor: pointer;">' +
        '<span class="glyphicon glyphicon-plus"></span></button>';
        $scope.gridConf = {
            data: 'tableData',
            enableRowSelection: false,
            columnDefs: [
                {displayName: '', width: '7%', cellTemplate: $scope.btnAdiciona},
                {field: 'label', width: '25%', displayName: 'Cuentas Exigibles', headerClass: "header-center"},
                {field: 'numCuenta', width: '20%', displayName: 'Numero de Cuenta', headerClass: "header-center"},
                {field: 'descripcionCuenta', displayName: 'Descripcion', headerClass: "header-center"}
            ]
        };

        contabilidadService.getList({}, {gruponivel: 'PCTA'}, serverConf.ERPCONTA, function (respuesta) {
            $scope.contaTree = createTree(respuesta.data);

            $scope.hideLoader();
        }, function (respuestaDeError) {

        });
    }

    $scope.onSelectRow = function edit(row) {
        var code = row.entity.code;
        $scope.showLoader();
        $timeout(function () {
            switch (code) {
                case 'cxp' : // Cuentas Por Pagar
                    $scope.cuentasPorPagarModal(row.entity);
                    break;
                case 'dxp' : // Documentos Por Pagar
                    $scope.documentosPorPagarModal(row.entity);
                    break;
                case 'asc' : // Anticipos Sobre Cuentas
                    $scope.anticiposSobreCuentasModal(row.entity);
                    break;
                default :
                    break;
            }
        }, 5);
    };

    $scope.cuentasPorPagarModal = function (row) {
        var modalDefaults = {
            controller: 'modal1'
        };

        var modalOptions = {
            headerText: 'Plan de cuentas',
            tree: $scope.contaTree
        };
        $scope.abrirTreeModal(modalDefaults, modalOptions, function (respuesta) {
            row.descripcionCuenta = respuesta.descripcion;
            row.numCuenta = respuesta.mascaraGenerada;
            $scope.grupo.idCntEntidadCtaXPagar = respuesta.idEntidad;
        });
    };

    $scope.documentosPorPagarModal = function (row) {
        var modalDefaults = {
            controller: 'modal1'
        };

        var modalOptions = {
            headerText: 'Plan de cuentas',
            tree: $scope.contaTree
        };

        $scope.abrirTreeModal(modalDefaults, modalOptions, function (respuesta) {
            row.descripcionCuenta = respuesta.descripcion;
            row.numCuenta = respuesta.mascaraGenerada;
            $scope.grupo.idCntEntidadDocXPagar = respuesta.idEntidad;
        });
    };

    $scope.anticiposSobreCuentasModal = function (row) {
        var modalDefaults = {
            controller: 'modal1'
        };

        var modalOptions = {
            headerText: 'Plan de cuentas',
            tree: $scope.contaTree
        };

        $scope.abrirTreeModal(modalDefaults, modalOptions, function (respuesta) {
            row.descripcionCuenta = respuesta.descripcion;
            row.numCuenta = respuesta.mascaraGenerada;
            $scope.grupo.idCntEntidadAnticipo = respuesta.idEntidad || "";
        });
    };


    $scope.adicionaConcepto = function () {
        tempCache['grupoInfo'] = tempCache.grupoInfo;
        $state.go('templateGrupo.adicionaConcepto');
    };

    $scope.volver = function () {
        $state.go('gruposTree.adicion');
    };

    $scope.modificaGrupo = function () {
        $scope.showLoader();
        cxpService.editGrupo($scope.grupo, {}, serverConf.ERPCONTA_WS, function (response) {
            //OK
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Correcto Modal",
                bodyText: "Correcto message",
                actionButtonText: "Continuar",
                type: 'exito',
                closeAfter: 2000
            });
            //$state.go('gruposTree.modificaGrupo');
            $state.transitionTo('templateGrupo.empty', {}, {reload: true});
        }, function (respuestaDeError) {
            // ERROR
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Error Modal",
                bodyText: "Error message",
                actionButtonText: "Continuar",
                type: 'error',
                closeAfter: 2000
            });
        });
    };


    $scope.btnEditaPlanPagos = '<div align="center">' +
    '<button type="button" height="5" class="btn btn-default" ng-click="conceptoEdita(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Concepto">' +
    '<span class="glyphicon glyphicon-pencil"></span>' +
    '</button>' +
    '</div>';

    $scope.gridConceptoPorGrupo = {
        data: 'listaConceptoPorGrupo',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        rowHeight: 33,
        columnDefs: [
            {
                field: 'descripcion',
                displayName: "Nombre",
                width: '50%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'parPeriodo.descripcion',
                displayName: 'Tipo Periodo',
                width: '40%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                displayName: "Editar",
                cellTemplate: $scope.btnEditaPlanPagos,
                width: '10%',
                enableCellEdit: false
            }
        ]
    };

    $scope.conceptoEdita = function (row) {
        console.info("CONCEPTO A EDITAR:", row.entity);
        console.info("CONCEPTO A EDITAR ID:", row.entity.idConcepto);
        //tempCache['grupoInfo'] = row.entity;
        //tempCache.grupoInfo. = row.entity.idConcepto;
        tempCache.idConceptoCache=row.entity.idConcepto;
        $state.transitionTo('templateGrupo.modificaConcepto', {idEntidadPojo: row.entity.idConcepto});

    };


    //ngGridConfig();
    init();
});
