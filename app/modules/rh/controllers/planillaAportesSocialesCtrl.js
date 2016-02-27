/**
 * Created by Pao on 09/11/2015.
 */

'use strict';

app.controller('planillaAportesSocialesCtrl', function ($scope, rhServices, serverConf, modalService, localStorageService, $state) {
    $scope.idPeriodo = localStorageService.get('periodoGestionObjeto').idPeriodoGestion;
    $scope.periodo = localStorageService.get('periodoGestionObjeto').periodo;
    $scope.gestion = localStorageService.get('periodoGestionObjeto').gestion;
    $scope.configuracionesDeVista = {
        eliminacionDehabilitada: true
    };
    console.log($scope.periodo, $scope.gestion);

    function obtenerPlanillaAportesSociales(idPeriodo, tipo) {
        $scope.showLoader();
        rhServices.getRegistrosPorPeriodo({}, {}, idPeriodo, tipo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.log("LISTA PLANILLA APORTES:", response.data);
            $scope.datosPlanilla = response.data;
            $scope.hideLoader();
        }, function (responseError) {
            console.log(responseError);
            $scope.hideLoader();
        });
    }

    function verificaDatosEnBase () {
        rhServices.verificarPlanilla($scope.idPeriodo, 'PASS', serverConf.ERPCONTA_WS, function (response) {
            // exito
            $scope.configuracionesDeVista.eliminacionDehabilitada = !response.data;
        }, function () {
            // error
        });
    }

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridAportes = {
        data: 'datosPlanilla',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 66,
        headerRowHeight: 60,
        columnDefs: [
            {
                field: 'rhEmpleadoCargo.rhEmpleado.codigo',
                displayName: "Código",
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                align: "center",
                sortable: true
            },
            {
                field: 'rhEmpleadoCargo.numeroItem',
                displayName: "N° Item",
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'rhEmpleadoCargo.rhEmpleado.nombreCompleto',
                displayName: "Nombres y Apellidos",
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'rhEmpleadoCargo.rhEmpleado.numeroDocumento',
                displayName: 'N° Doc.',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'totalGanado',
                displayName: 'Total Ganado',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'sipPatronal',
                displayName: 'Patronal',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'sipLaboral',
                displayName: 'Laboral',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'sipSubtotal',
                displayName: 'Subtotal SIP',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ansPatronal',
                displayName: 'Patronal',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ansLaboral',
                displayName: 'Laboral',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'ansSubtotal',
                displayName: 'Subtotal ANS',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'provivienda',
                displayName: 'Provivienda',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'cajaSalud',
                displayName: 'Caja de Salud',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'totalGeneral',
                displayName: 'Total General',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            }
        ]
    };

    function init() {
        obtenerPlanillaAportesSociales($scope.idPeriodo, 'PASS');
        //verificaDatosEnBase();
    }

    init();

    $scope.exportar = function (format) {
        var exportArray = [], row;
        for (var i = 0; i < $scope.datosPlanilla.length; i++) {
            row = $scope.datosPlanilla[i];
            if (format === 'xlsx') {
                var objecto = {
                    codigo: row.rhEmpleadoCargo.rhEmpleado.codigo,
                    numeroItem: row.rhEmpleadoCargo.numeroItem,
                    nombreCompleto: row.rhEmpleadoCargo.rhEmpleado.nombreCompleto,
                    nroDocumento: row.rhEmpleadoCargo.rhEmpleado.numeroDocumento,
                    totalGanado:row.totalGanado,
                    sipPatronal:row.sipPatronal,
                    sipLaboral:row.sipLaboral,
                    sipSubtotal:row.sipSubtotal,
                    ansPatronal:row.ansPatronal,
                    ansLaboral:row.ansLaboral,
                    ansSubtotal:row.ansSubtotal,
                    provivienda:row.provivienda,
                    cajaSalud:row.cajaSalud,
                    totalGeneral:row.totalGeneral
                };
                exportArray.push(objecto);
            }
        }
        $scope.showLoader();
        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("Planilla_Aportes_Seguridad_Social.xlsx",{headers:true}) FROM ?', [exportArray]);
        } else if (format === 'csv') {
            return exportArray;
        }
        $scope.hideLoader();
    };

    $scope.guardar = function () {
        var modalDefaults = {
            templateUrl: 'views/modalTemplates/verificarEliminacion.html'
        }, modalOptions = {
            headerText: "Mensaje de Sistema.",
            bodyText: "�Esta seguro de generar la planilla de aportes para el periodo " + $scope.periodo + " gesti�n " + $scope.gestion+ ", con los datos actuales?",
            actionButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        };

        modalService.show(modalDefaults,modalOptions).then(function () {
            $scope.showLoader();
            rhServices.guardarPlanillaImpositiva($scope.datosPlanilla, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje de Sistema.",
                    bodyText: "Los datos se guardaron exitosamente.",
                    actionButtonText: "Aceptar",
                    type: 'exito'
                }, function() {
                    verificaDatosEnBase();
                }, function() {
                    verificaDatosEnBase();
                });
            }, function () {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje de Sistema.",
                    bodyText: "Error al guardar los datos.",
                    actionButtonText: "Aceptar",
                    type: 'error'
                });
            });
        }, function () {
            console.log('accion cancelar');
        });
    };

    $scope.eliminar = function () {
        var modalDefaults = {
            templateUrl: 'views/modalTemplates/verificarEliminacion.html'
        }, modalOptions = {
            headerText: "Mensaje del Sistema.",
            bodyText: "�Esta seguro de eliminar la planilla de aportes para el periodo " + $scope.periodo + " gesti�n " + $scope.gestion+ "?",
            actionButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        };

        modalService.show(modalDefaults,modalOptions).then(function () {
            $scope.showLoader();
            rhServices.eliminacionPlanilla($scope.idPeriodo, serverConf.ERPCONTA_WS, function () {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje del Sistema.",
                    bodyText: "Los datos se eliminaron.",
                    actionButtonText: "Aceptar",
                    type: 'exito'
                }, function () {
                    $state.go('rhEnBlanco');
                }, function () {
                    $state.go('rhEnBlanco');
                });
            }, function () {
                $scope.hideLoader();
            });
        }, function () {

        })
    };
});

