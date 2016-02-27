/**
 * Created by paola on 28-10-15.
 */
'use strict';

app.controller('planillaSueldosCtrl', function ($scope, rhServices, serverConf, modalService, localStorageService, $state) {
    $scope.idPeriodo = localStorageService.get('periodoGestionObjeto').idPeriodoGestion;
    $scope.periodo = localStorageService.get('periodoGestionObjeto').periodo;
    $scope.gestion = localStorageService.get('periodoGestionObjeto').gestion;
    $scope.configuracionesDeVista = {
        eliminacionDehabilitada: true
    };

    console.log($scope.periodo, $scope.gestion);

    function obtenerPlanillaSueldos(idPeriodo, tipo) {
        $scope.showLoader();
        rhServices.getRegistrosPorPeriodo({}, {}, idPeriodo, tipo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.log("LISTA SUELDOS:", response.data);
            $scope.datosSueldos = response.data;
            $scope.hideLoader();
        }, function (responseError) {
            console.log(responseError);
            $scope.hideLoader();
        });
    };

    function verificaDatosEnBase () {
        rhServices.verificarPlanilla($scope.idPeriodo, 'PSUE', serverConf.ERPCONTA_WS, function (response) {
            // exito
            $scope.configuracionesDeVista.eliminacionDehabilitada = !response.data;
        }, function () {
            // error
        });
    }


    $scope.currencyTemplate = '<div style="padding: 8px"><span>{{row.getProperty(col.field)|currency:"":2}}</span></div>';

    $scope.gridSueldos = {
        data: 'datosSueldos',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 66,
        headerRowHeight: 66,
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
                field: 'rhEmpleadoCargo.sueldo',
                displayName: 'Sueldo Básico',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'diasTrabajados',
                displayName: 'Días Trab.',
                width: '4%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'ingresoDiasTrabajados',
                displayName: 'Ingreso Días Trab. (A)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'porcentajeAntiguedad',
                displayName: 'Ant. (%)',
                width: '4%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'bonoAntiguedad',
                displayName: 'Bono Antigüedad (B)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'horasExtras',
                displayName: 'Horas Extras',
                width: '4%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'ingresoHorasExtras',
                displayName: 'Ingreso Hrs Extras (C)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'horasNocturnas',
                displayName: 'Horas Noct.',
                width: '4%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'ingresoHorasNocturnas',
                displayName: 'Ingreso Hrs Noct. (D)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'horasDomingo',
                displayName: 'Horas Dom.',
                width: '4%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'ingresoHorasDomingo',
                displayName: 'Ingreso Hrs Dom. (E)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'diasDomingo',
                displayName: 'Días Dom.',
                width: '4%',
                headerClass: "header-center",
                cellClass: "text-right"
            },
            {
                field: 'ingresoDiasDomingo',
                displayName: 'Ingreso Días Dom. (F)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'bonoProduccion',
                displayName: 'Bono Producción (G)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'otrosBonos',
                displayName: 'Otros Bonos (H)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'totalGanado',
                displayName: 'Total Ganado (I) A+B+C+D+E+F+G+H',
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'afp',
                displayName: 'AFP (J)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'aporteNacionalSolidario',
                displayName: 'Aporte Nacional Sol. (K)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'rcIva',
                displayName: 'RC-IVA (L)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'otrosDescuentos',
                displayName: 'Otros Desct. (M)',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'totalDescuentos',
                displayName: 'Total Desct. (N) J+K+L+M',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            },
            {
                field: 'liquidoPagable',
                displayName: 'Líquido Pagable (O) I-N',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellTemplate:$scope.currencyTemplate
            }
        ]
    };

    function init() {
        obtenerPlanillaSueldos($scope.idPeriodo, 'PSUE');
        verificaDatosEnBase();
    }

    init();

    $scope.exportar = function (format) {
        var exportArray = [], row;
        for (var i = 0; i < $scope.datosSueldos.length; i++) {
            row = $scope.datosSueldos[i];
            if (format === 'xlsx') {
                var objecto = {
                    codigo: row.rhEmpleadoCargo.rhEmpleado.codigo,
                    numeroItem: row.rhEmpleadoCargo.numeroItem,
                    nombreCompleto: row.rhEmpleadoCargo.rhEmpleado.nombreCompleto,
                    nroDocumento: row.rhEmpleadoCargo.rhEmpleado.numeroDocumento,
                    sueldoBasico: row.rhEmpleadoCargo.sueldo,
                    diasTrab: row.diasTrabajados,
                    ingDiasTrab: row.ingresoDiasTrabajados,
                    porcentajeAnt:row.porcentajeAntiguedad,
                    bonoAnt:row.bonoAntiguedad,
                    horasExtras:row.horasExtras,
                    IngHorasExtras:row.ingresoHorasExtras,
                    horasNoct:row.horasNocturnas,
                    IngHorasNoct:row.ingresoHorasNocturnas,
                    horasDomingo:row.horasDomingo,
                    IngHorasDomingo:row.ingresoHorasDomingo,
                    diasDom:row.diasDomingo,
                    IngDiasDom:row.ingresoDiasDomingo,
                    bonoProd:row.bonoProduccion,
                    otrosBonos:row.otrosBonos,
                    totalGanado:row.totalGanado,
                    afp:row.afp,
                    apnasol:row.aporteNacionalSolidario,
                    rcIva:row.rcIva,
                    otrosDesct:row.otrosDescuentos,
                    totalDesct:row.totalDescuentos,
                    liqPagable:row.liquidoPagable
                };
                exportArray.push(objecto);
            }
        }
        $scope.showLoader();
        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("Planilla_Sueldos.xlsx",{headers:true}) FROM ?', [exportArray]);
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
            bodyText: "¿Esta seguro de generar la planilla de sueldos para el periodo " + $scope.periodo + " gestión " + $scope.gestion+ ", con los datos actuales?",
            actionButtonText: "Guardar",
            cancelButtonText: "Cancelar"
        };

        modalService.show(modalDefaults,modalOptions).then(function () {
            $scope.showLoader();
            rhServices.guardarPlanillaSueldos($scope.datosSueldos, {}, serverConf.ERPCONTA_WS, function (response) {
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
            headerText: "Mensaje de Sistema.",
            bodyText: "¿Esta seguro de eliminar la planilla de sueldos para el periodo " + $scope.periodo + " gestión " + $scope.gestion+ "?",
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

        });
    };
});
