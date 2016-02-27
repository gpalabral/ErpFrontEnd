/**
 * Created by paola on 30-10-15.
 */

'use strict';

app.controller('planillaRcIvaCtrl', function ($scope, rhServices, serverConf, cpanelService,modalService, localStorageService, $state) {
    $scope.idPeriodo = localStorageService.get('periodoGestionObjeto').idPeriodoGestion;
    $scope.periodo = localStorageService.get('periodoGestionObjeto').periodo;
    $scope.gestion = localStorageService.get('periodoGestionObjeto').gestion;


    $scope.configuracionesDeVista = {
        eliminacionDehabilitada: true
    };
    console.log($scope.periodo, $scope.gestion);

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene los datos de la Empresa*/
    function obtenerEmpresaPorId(idEmpresa){
        cpanelService.getDatosEmpresaById({}, {},idEmpresa,serverConf.CPANEL_WS, function (response) {
            console.info("Datos de empresa",response.data);
            //$scope.datosEmpresa.nit=response.data.nit;
            $scope.nombreReporte="planillaImpositiva"+$scope.periodo+$scope.gestion+"_"+response.data.nit;
        });
    };
    function obtenerPlanillaRcIva(idPeriodo, tipo) {
        $scope.showLoader();
        rhServices.getRegistrosPorPeriodo({}, {}, idPeriodo, tipo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.log("LISTA PLANILLA RC-IVA:", response.data);
            $scope.datosPlanilla = response.data;
            $scope.hideLoader();
        }, function (responseError) {
            console.log(responseError);
            $scope.hideLoader();
        });
    }

    function verificaDatosEnBase () {
        rhServices.verificarPlanilla($scope.idPeriodo, 'PIMP', serverConf.ERPCONTA_WS, function (response) {
            // exito
            $scope.configuracionesDeVista.eliminacionDehabilitada = !response.data;
        }, function () {
            // error
        });
    }

    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridSueldos = {
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
                cellClass: "text-left",
                align: "center",
                sortable: true
            },
            {
                field: 'rhEmpleadoCargo.numeroItem',
                displayName: "N° Item",
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-left",
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
                field: 'rhPrimas.montoPrima',
                displayName: 'Prima',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'afp',
                displayName: 'Afp',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'aporteNacionalSolidario',
                displayName: 'Aporte Nacional Solidario',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'sueldoNeto',
                displayName: 'Sueldo Neto',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'dosSalariosMinimos',
                displayName: 'Mínimo no Imponible (2SMN)',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'baseImponible',
                displayName: 'Base Imponible',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'debitoFiscal',
                displayName: 'Débito Fiscal (13%)',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'creditoFiscal',
                displayName: 'Crédito Fiscal (Form 110)',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'computoDosMinimosNacionales',
                displayName: '13% sobre 2SMN',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'saldoPeriodoAnterior',
                displayName: 'Saldo Anterior Actualizado',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'saldoPeriodoSiguiente',
                displayName: 'Saldo a Favor Dependiente',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'impuestoRcIva',
                displayName: 'Saldo a Favor Fisco',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            }
        ]
    };

    function init() {
        obtenerPlanillaRcIva($scope.idPeriodo, 'PIMP');
        verificaDatosEnBase();
        obtenerEmpresaPorId(1);
    }

    init();

    $scope.exportar = function (format) {
        var exportArray = [], row;
        for (var i = 0; i < $scope.datosPlanilla.length; i++) {
            row = $scope.datosPlanilla[i];
            if( format === 'xlsx' ) {
                exportArray.push({
                    codigo: row.rhEmpleadoCargo.rhEmpleado.codigo,
                    numeroItem: row.rhEmpleadoCargo.numeroItem,
                    nombreCompleto: row.rhEmpleadoCargo.rhEmpleado.nombreCompleto,
                    nroDocumento: row.rhEmpleadoCargo.rhEmpleado.numeroDocumento,
                    sueldoBasico: row.rhEmpleadoCargo.sueldo,
                    totalGanado:row.totalGanado,
                    prima:row.rhPrimas.montoPrima,
                    afp:row.afp,
                    apnasol:row.aporteNacionalSolidario,
                    sueldoNeto:row.sueldoNeto,
                    minimoNoImponible:row.dosSalariosMinimos,
                    baseImponible:row.baseImponible,
                    debitoFiscal:row.debitoFiscal,
                    creditoFiscal:row.creditoFiscal,
                    computoDosMinimosNacionales:row.computoDosMinimosNacionales,
                    saldoPeriodoAnterior:row.saldoPeriodoAnterior,
                    saldoPeriodoSiguiente:row.saldoPeriodoSiguiente,
                    impuestoRcIva:row.impuestoRcIva
                });
            }else {
                exportArray.push({
                    codigo: row.rhEmpleadoCargo.rhEmpleado.codigo,
                    numeroItem: row.rhEmpleadoCargo.numeroItem,
                    nombreCompleto: row.rhEmpleadoCargo.rhEmpleado.nombreCompleto,
                    nroDocumento: row.rhEmpleadoCargo.rhEmpleado.numeroDocumento,
                    sueldoBasico: row.rhEmpleadoCargo.sueldo,
                    totalGanado:row.totalGanado,
                    prima:row.rhPrimas.montoPrima,
                    afp:row.afp,
                    apnasol:row.aporteNacionalSolidario,
                    sueldoNeto:row.sueldoNeto,
                    minimoNoImponible:row.dosSalariosMinimos,
                    baseImponible:row.baseImponible,
                    debitoFiscal:row.debitoFiscal,
                    creditoFiscal:row.creditoFiscal,
                    computoDosMinimosNacionales:row.computoDosMinimosNacionales,
                    saldoPeriodoAnterior:row.saldoPeriodoAnterior,
                    saldoPeriodoSiguiente:row.saldoPeriodoSiguiente,
                    impuestoRcIva:row.impuestoRcIva
                });

            }
        }

        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("Planilla_Impositiva.xlsx",{headers:true}) FROM ?', [exportArray]);
        } else if (format === 'csv') {
            return exportArray;
        }
    };

    $scope.guardar = function () {
        var modalDefaults = {
            templateUrl: 'views/modalTemplates/verificarEliminacion.html'
        }, modalOptions = {
            headerText: "Mensaje de Sistema.",
            bodyText: "¿Esta seguro de generar la planilla impositiva para el periodo " + $scope.periodo + " gestión " + $scope.gestion+ ", con los datos actuales?",
            actionButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        };

        modalService.show(modalDefaults,modalOptions).then(function () {
            $scope.showLoader();
            rhServices.guardarPlanillaImpositiva($scope.datosPlanilla, {}, serverConf.ERPCONTA_WS, function (response) {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje de Sistema.",
                    bodyText: "Los datos se guardaron correctamente.",
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
            headerText: "Mensaje de Sistema.",
            bodyText: "¿Esta seguro de eliminar la planilla impositiva para el periodo " + $scope.periodo + " gestión " + $scope.gestion+ "?",
            actionButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        };

        modalService.show(modalDefaults,modalOptions).then(function () {
            $scope.showLoader();
            rhServices.eliminacionPlanilla($scope.idPeriodo, serverConf.ERPCONTA_WS, function () {
                $scope.hideLoader();
                $scope.showCustomModal({
                    headerText: "Mensaje de Sistema.",
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
