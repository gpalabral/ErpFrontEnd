/**
 * Created by paola on 09-10-15.
 */
'use strict';

app.controller('tabIngresosDescuentos', function ($scope, rhServices, serverConf, modalService, localStorageService, $timeout, tempCache) {
    $scope.idPeriodo = localStorageService.get('periodoGestionObjeto').idPeriodoGestion;
    $scope.periodo = localStorageService.get('periodoGestionObjeto').periodo;
    $scope.gestion = localStorageService.get('periodoGestionObjeto').gestion;
    console.log($scope.periodo, $scope.gestion);

    $scope.estadosDeImportacion = {
        conceptosPorIngresosDeshabilitado: true,
        descuentosDeshabilitado: true
    };

    /**********************************DESCUENTOS*************************************/
    function obtenerDescuentos(idPeriodo, tipo) {
        rhServices.getRegistrosPorPeriodo({}, {}, idPeriodo, tipo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.log("PROBANDO.........");
            $scope.desc = [];
            $scope.datosDescuentos = response.data;
            console.info("datosDescuentos:", $scope.datosDescuentos);
            $scope.desc = $scope.datosDescuentos[0].listaDescuentos;
            var autoWidth = $scope.desc.length === 0;

            $scope.estadosDeImportacion.descuentosDeshabilitado = autoWidth;
            $scope.myDefs = [
                {
                    field: 'codigo',
                    displayName: 'Código',
                    width: autoWidth ? '*' : '5%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: 'numeroItem',
                    displayName: 'N° Item',
                    width: autoWidth ? '*' : '5%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: 'nombreCompleto',
                    displayName: 'Nombre Empleado',
                    width: autoWidth ? '*' : '20%',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: 'departamento',
                    displayName: 'Departamento',
                    width: autoWidth ? '*' : '10%',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: 'cargo',
                    displayName: 'Cargo',
                    width: autoWidth ? '*' : '10%',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: 'carnetIdentidad',
                    displayName: 'CI',
                    width: autoWidth ? '*' : '6%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                }];
            for (var i = 0; i < $scope.desc.length; i++) {
                $scope.myDefs.push({
                    field: 'listaDescuentos[' + i + '].monto',
                    displayName: $scope.desc[i].descripcion,
                    width: '*',
                    enableCellEdit: false,
                    cellClass: "text-right",
                    cellTemplate: '<input type="text"  name="des" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" currency-input decimals="2"/>',
                    headerClass: "header-center"
                });
            }

            console.info("PROBANDO cccc.........", $scope.myDefs);

        }, function (responseError) {
            console.log(responseError);
        });
    }

    function init() {
        grillaDescuentos();
        obtenerDescuentos($scope.idPeriodo, 'DES');
    }
    function grillaDescuentos() {

        $scope.btnOpciones = '<div align="center" class="ngCellText ng-scope col0 colt0" ng-class="col.colIndex()">' +
        '<span ng-cell-text="" class="ng-binding"><button type="button" class="btn btn-default btn-xs" ng-click="editarDescuentos(row);$event.stopPropagation();">' +
        '<span class="glyphicon glyphicon-pencil"></span></button>' +
        '</span></div>';

        $scope.gridDescuentos = {
            data: 'datosDescuentos',
            enableRowSelection: false,
            enableCellEdit: false,
            enableCellSelection: false,
            enableCellEditOnFocus: false,
            enableColumnResize: true,
            multiSelect: false,
            enableSorting: true,
            headerRowHeight: 48,
            columnDefs: 'myDefs'
        };
    }

    $scope.guardarDescuentos = function () {
        $scope.showLoader();
        console.log(JSON.stringify($scope.datosDescuentos, null, 4));
        rhServices.modificarDescuentos($scope.datosDescuentos, {}, $scope.idPeriodo, serverConf.ERPCONTA_WS, function (response) {
            console.log("Datos Guardados", response.data);
            obtenerDescuentos($scope.idPeriodo, 'DES');
            $scope.hideLoader();
            $scope.showCustomModal({
                headerText: "Mensaje de Confirmacion",
                bodyText: "Los datos se guardaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 3000
            });

        });
    };
    $scope.exportar = function (format) {

        var exportArray = [], row;
        for (var i = 0; i < $scope.datosDescuentos.length; i++) {
            row = $scope.datosDescuentos[i];
            if (format === 'xlsx') {
                var objecto = {
                    codigo: row.codigo,
                    numeroItem: row.numeroItem,
                    nombreCompleto: row.nombreCompleto,
                    departamento: row.departamento,
                    cargo: row.cargo,
                    carnetIdentidad: row.carnetIdentidad
                };
                for (var j = 0, key; j < row.listaDescuentos.length; j++) {
                    key = row.listaDescuentos[j].descripcion;
                    objecto[key] = Number(row.listaDescuentos[j].monto);
                }
                exportArray.push(objecto);
            }
        }
        $scope.showLoader();
        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("descuentos.xlsx",{headers:true}) FROM ?', [exportArray]);
        } else if (format === 'csv') {
            return exportArray;
        }
        $scope.hideLoader();
    };
    $scope.importarXLS = function (files) {

        if (files && files.length) {
            //$scope.facturaEmitidaPojo.listaCpcDetalleFactura = [];
            var data = {
                idPeriodoGestion: $scope.idPeriodo,
                tipoEntidad: 'DES'
            };
            $scope.showLoader();
            rhServices.excelImport(files[files.length - 1], 'xls', serverConf.ERPCONTA_WS, data, function (response) {
                /*var xls = response.data,
                 row;*/
                $scope.datosDescuentos = response.data;
                console.log(response.data);
                $scope.hideLoader();
            }, function (responseError) {
                //error
                $scope.hideLoader();
            });
        }
    };

    init();
    /***********************************FIN-DESCUENTOS********************************/

    /*****************************CONCEPTOS DE INGRESOS*******************************/
    function obtenerConceptosIngreso(idPeriodo, tipo) {
        rhServices.getRegistrosPorPeriodo({}, {}, idPeriodo, tipo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.log("PROBANDO.........");
            $scope.ing = [];
            $scope.datosConceptosIng = response.data;
            console.info("datosConceptosIng:", $scope.datosConceptosIng);
            $scope.ing = $scope.datosConceptosIng[0].listaCriterioDeIngresoPojo;
            var autoWidth = $scope.ing && $scope.ing.length === 0;
            $scope.estadosDeImportacion.conceptosPorIngresosDeshabilitado = autoWidth;
            $scope.myDefsIng = [
                {
                    field: 'codigo',
                    displayName: 'Código',
                    width: autoWidth ? '*' : '5%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: 'numeroItem',
                    displayName: 'N° Item',
                    width: autoWidth ? '*' : '5%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                },
                {
                    field: 'nombreCompleto',
                    displayName: 'Nombre Empleado',
                    width: autoWidth ? '*' : '20%',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: 'departamento',
                    displayName: 'Departamento',
                    width: autoWidth ? '*' : '10%',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: 'cargo',
                    displayName: 'Cargo',
                    width: autoWidth ? '*' : '10%',
                    headerClass: "header-center",
                    cellClass: "text-left"
                },
                {
                    field: 'carnetIdentidad',
                    displayName: 'CI',
                    width: autoWidth ? '*' : '6%',
                    headerClass: "header-center",
                    cellClass: "text-right"
                }];
            for (var i = 0; $scope.ing && i < $scope.ing.length; i++) {
                $scope.myDefsIng.push({
                    field: 'listaCriterioDeIngresoPojo[' + i + '].monto',
                    displayName: $scope.ing[i].descripcion,
                    width: '*',
                    enableCellEdit: false,
                    cellClass: "text-right",
                    cellTemplate: '<input type="text"  name="des" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                    '             ng-model="COL_FIELD" currency-input decimals="2"/>',
                    headerClass: "header-center"
                });
            }

            console.info("PROBANDO cccc.........", $scope.myDefsIng);

        }, function (responseError) {
            console.log(responseError);
        });
    }
    function initIng() {
        grillaIngresos();
        obtenerConceptosIngreso($scope.idPeriodo, 'CIN');
    }
    function grillaIngresos() {
        $scope.gridIngresos = {
            data: 'datosConceptosIng',
            enableRowSelection: false,
            enableCellEdit: false,
            enableCellSelection: false,
            enableCellEditOnFocus: false,
            enableColumnResize: true,
            multiSelect: false,
            enableSorting: true,
            headerRowHeight: 48,
            columnDefs: 'myDefsIng'
        };
    }
     $scope.guardarIngresos=function(){
         //console.log(JSON.stringify($scope.datosDescuentos,null,4));
         rhServices.modificarIngresos($scope.datosConceptosIng, {},$scope.idPeriodo,serverConf.ERPCONTA_WS,function (response) {
             console.log("Datos Guardados",response.data);
             obtenerConceptosIngreso($scope.idPeriodo, 'CIN');
             $scope.showCustomModal({
                 headerText: "Mensaje de Confirmación",
                 bodyText: "Los datos se guardaron correctamente.",
                 actionButtonText: "Aceptar",
                 type: 'exito',
                 closeAfter: 3000
                });
          });
      };
    $scope.exportarIngresos = function (format) {
        var exportArray = [], row;
        for (var i = 0; i < $scope.datosConceptosIng.length; i++) {
            row = $scope.datosConceptosIng[i];
            if (format === 'xlsx') {
                var objecto = {
                    codigo: row.codigo,
                    numeroItem: row.numeroItem,
                    nombreCompleto: row.nombreCompleto,
                    departamento: row.departamento,
                    cargo: row.cargo,
                    carnetIdentidad: row.carnetIdentidad
                };
                for (var j = 0, key; j < row.listaCriterioDeIngresoPojo.length; j++) {
                    key = row.listaCriterioDeIngresoPojo[j].descripcion;
                    objecto[key] = Number(row.listaCriterioDeIngresoPojo[j].monto);
                }
                exportArray.push(objecto);
            }
        }
        $scope.showLoader();
        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("conceptosDeIngreso.xlsx",{headers:true}) FROM ?', [exportArray]);
        } else if (format === 'csv') {
            return exportArray;
        }
        $scope.hideLoader();
    };
    $scope.importarXLSIngresos = function (files) {

        if (files && files.length) {
            //$scope.facturaEmitidaPojo.listaCpcDetalleFactura = [];
            $scope.showLoader();
            var data = {
                idPeriodoGestion: $scope.idPeriodo,
                tipoEntidad: 'CIN'
            };
            rhServices.excelImport(files[files.length - 1], 'xls', serverConf.ERPCONTA_WS, data, function (response) {
                /*var xls = response.data,
                 row;*/
                $scope.datosConceptosIng = response.data;
                console.log(response.data);
                $scope.hideLoader();
            }, function (responseError) {
                //error
                $scope.hideLoader();
            });
        }

    };

    initIng();
    /***********************************FIN-DESCUENTOS********************************/

    /*****************************VARIACIONES*******************************/

    function initVariaciones() {
        obtenerVariaciones($scope.idPeriodo, 'VAR');
    }

    function obtenerVariaciones(idPeriodo, tipo) {
        $scope.showLoader();
        rhServices.getVariacionesPorPeriodo({}, {}, idPeriodo, tipo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.log("LISTA VARIACION:", response.data);
            $scope.datosVariaciones = response.data;
            angular.forEach($scope.datosVariaciones, function (variaciones) {
                variaciones["diasTrabajadosAux"] = variaciones.diasTrabajados+variaciones.diasNoTrabajados;
            });
            $scope.hideLoader();
        }, function (responseError) {
            console.log(responseError);
            $scope.hideLoader();
        });
    }

    $scope.gridVariaciones = {
        data: 'datosVariaciones',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 66,
        headerRowHeight: 55,
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
                field: 'item',
                displayName: "Item",
                width: '8%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'rhEmpleadoCargo.rhEmpleado.nombreCompleto',
                displayName: "Nombre",
                width: '20%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'rhEmpleadoCargo.rhCargo.erpDepartamento.descripcion',
                displayName: 'Departamento',
                width: '25%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'diasTrabajados',
                displayName: 'Días Trabajados',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'diasNoTrabajados',
                displayName: 'Días No Trabajados',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'diasDeFalta',
                displayName: 'Días Faltas',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'diasDeMulta',
                displayName: 'Días Multas',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'diasAjuste',
                displayName: 'Días Ajuste',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'diasFeriado',
                displayName: 'Días Feriados',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'diasDomingo',
                displayName: 'Días Domingos',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'horasExtras',
                displayName: 'Horas Extras',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'horasNocturnas',
                displayName: 'Horas Nocturnas',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'horasAjuste',
                displayName: 'Horas Ajuste',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'horasFeriado',
                displayName: 'Horas Feriados',
                width: '5%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'horasDomingo',
                displayName: 'Horas Domingos',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'diasDescanso',
                displayName: 'Dias Descanso',
                width: '6%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            },
            {
                field: 'diasDescansoTrabajados',
                displayName: 'Dias Descanso Trabajados',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            }
        ]
    };

    $scope.$on('ngGridEventEndCellEdit', function (event) {
            var columnaSeleccionada = event.targetScope.col.field;
            var datosFila = event.targetScope.row.entity;
            switch (event.targetScope.gridId) {
                case $scope.gridVariaciones.$gridScope.gridId:
                    switch (columnaSeleccionada) {
                        case 'diasTrabajados':
                            console.info("diasTrabajados");
                            console.info("datosFila:", datosFila);
                            if (event.targetScope.row.entity.diasTrabajados <= event.targetScope.row.entity.diasTrabajadosAux) {
                                event.targetScope.row.entity.diasNoTrabajados = event.targetScope.row.entity.diasTrabajadosAux - event.targetScope.row.entity.diasTrabajados;
                            }else{
                                $scope.showCustomModal({
                                    headerText: "Mensaje",
                                    bodyText: "El valor introducido en la columna Días Trabajados: ."
                                    +event.targetScope.row.entity.diasTrabajados
                                    +" sobrepasó al valor inicial: "
                                    +event.targetScope.row.entity.diasTrabajadosAux
                                    +" se cambiará a su valor original.",
                                    actionButtonText: "Continuar",
                                    type: 'error',
                                    closeAfter: 6000
                                });
                                event.targetScope.row.entity.diasTrabajados = event.targetScope.row.entity.diasTrabajadosAux;
                                event.targetScope.row.entity.diasNoTrabajados = event.targetScope.row.entity.diasTrabajadosAux - event.targetScope.row.entity.diasTrabajados;
                            }
                            break;
                        case 'diasNoTrabajados':
                            console.info("diasNoTrabajados");
                            console.info("datosFila:", datosFila);
                            if (event.targetScope.row.entity.diasNoTrabajados <= event.targetScope.row.entity.diasTrabajadosAux) {
                                event.targetScope.row.entity.diasTrabajados = event.targetScope.row.entity.diasTrabajadosAux - event.targetScope.row.entity.diasNoTrabajados;
                            }else{
                                $scope.showCustomModal({
                                    headerText: "Mensaje",
                                    bodyText: "El valor introducido en la columna Días No Trabajados: ."
                                    +event.targetScope.row.entity.diasNoTrabajados
                                    +" sobrepasó al valor Días Trabajados: "
                                    +event.targetScope.row.entity.diasTrabajadosAux
                                    +" se cambiará a su valor original.",
                                    actionButtonText: "Continuar",
                                    type: 'error',
                                    closeAfter: 6000
                                });
                                event.targetScope.row.entity.diasTrabajados = event.targetScope.row.entity.diasTrabajadosAux;
                                event.targetScope.row.entity.diasNoTrabajados = 0;
                            }
                            break;
                        case 'diasDeFalta':
                            console.info("diasDeFalta");
                            break;
                        case 'diasDeMulta':
                            console.info("diasDeMulta");
                            break;
                        case 'diasAjuste':
                            console.info("diasAjuste");
                            break;
                        case 'diasFeriado':
                            console.info("diasFeriado");
                            break;
                        case 'diasDomingo':
                            console.info("diasDomingo");
                            break;
                        case 'horasExtras':
                            console.info("horasExtras");
                            break;
                        case 'horasNocturnas':
                            console.info("horasNocturnas");
                            break;
                        case 'horasAjuste':
                            console.info("horasAjuste");
                            break;
                        case 'horasFeriado':
                            console.info("horasFeriado");
                            break;
                        case 'horasDomingo':
                            console.info("horasDomingo");
                            break;
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    break;
            }
        }
    );

    $scope.importarVariacionesXLS = function (files) {
        if (files && files.length) {
            var data = {
                idPeriodoGestion: $scope.idPeriodo,
                tipoEntidad: 'VAR'
            };
            $scope.showLoader();
            rhServices.excelImport(files[files.length - 1], 'xls', serverConf.ERPCONTA_WS, data, function (response) {
                $scope.datosVariaciones = response.data;
                $scope.hideLoader();
                console.log(response.data);
            }, function () {
                $scope.hideLoader();
            });
        }
    };

    $scope.exportarVariaciones = function (format) {
        var exportArray = [], row;
        for (var i = 0; i < $scope.datosVariaciones.length; i++) {
            row = $scope.datosVariaciones[i];
            if (format === 'xlsx') {
                var objecto = {
                    codigo: row.rhEmpleadoCargo.rhEmpleado.codigo,
                    numeroItem: row.item,
                    nombre: row.rhEmpleadoCargo.rhEmpleado.nombreCompleto,
                    departamento: row.rhEmpleadoCargo.rhCargo.erpDepartamento.descripcion,
                    diasTrabajados: row.diasTrabajados,
                    diasNoTrabajados: row.diasNoTrabajados,
                    diasDeFalta: row.diasDeFalta,
                    diasDeMulta: row.diasDeMulta,
                    diasAjuste: row.diasAjuste,
                    diasFeriado: row.diasFeriado,
                    diasDomingo: row.diasDomingo,
                    horasExtras: row.horasExtras,
                    horasNocturnas: row.horasNocturnas,
                    horasAjuste: row.horasAjuste,
                    horasFeriado: row.horasFeriado,
                    horasDomingo: row.horasDomingo,
                    diasDescanso: row.diasDescanso,
                    diasDescansoTrabajados: row.diasDescansoTrabajados
                };
                exportArray.push(objecto);
            }
        }

        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("Variaciones.xlsx",{headers:true}) FROM ?', [exportArray]);
        } else if (format === 'csv') {
            return exportArray;
        }
    };

    $scope.guardarRhVariacion= function () {
        console.log(JSON.stringify($scope.datosVariaciones, null, 4));
        rhServices.modificaRhVariacion($scope.datosVariaciones, {}, $scope.idPeriodo, serverConf.ERPCONTA_WS, function (response) {
            console.log("Datos Guardados", response.data);
            $scope.showCustomModal({
                headerText: "Mensaje de Confirmacion",
                bodyText: "Los datos se guardaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 3000
            });

        });
    };

    initVariaciones();
    /*****************************FIN VARIACIONES*******************************/

    /*****************************RC - IVA*******************************/

    function initRcIva() {
        obtenerRcIva($scope.idPeriodo, 'RCIVA');
    }

    function obtenerRcIva(idPeriodo, tipo) {
        rhServices.getRegistrosPorPeriodo({}, {}, idPeriodo, tipo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.log("LISTA RCIVA:", response.data);
            $scope.datosRcIva = response.data;
        }, function (responseError) {
            console.log(responseError);
        });
    }

    $scope.gridRcIva= {
        data: 'datosRcIva',
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
                displayName: "Item",
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true
            },
            {
                field: 'rhEmpleadoCargo.rhEmpleado.nombreCompleto',
                displayName: "Nombre",
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'rhEmpleadoCargo.rhCargo.erpDepartamento.descripcion',
                displayName: 'Departamento',
                width: '21%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'rhEmpleadoCargo.rhCargo.nombreCargo',
                displayName: 'Cargo',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'rhEmpleadoCargo.rhEmpleado.numeroDocumento',
                displayName: 'Numero Documento',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'saldoAcumulado',
                displayName: 'Saldo Periodo Anterior',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'monto',
                displayName: 'Formulario 110',
                width: '7%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" currency-input decimals="2" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            }
        ]
    };

    $scope.importarRcIvaXLS = function (files) {
        if (files && files.length) {
            var data = {
                idPeriodoGestion: $scope.idPeriodo,
                tipoEntidad: 'RCIVA'
            };
            $scope.showLoader();
            rhServices.excelImport(files[files.length - 1], 'xls', serverConf.ERPCONTA_WS, data, function (response) {
                /*var xls = response.data,
                 row;*/
                $scope.datosRcIva = response.data;
                console.log(response.data);
                $scope.hideLoader();
            }, function () {
                $scope.hideLoader();
            });
        }
    };

    $scope.exportarRcIva = function (format) {
        var exportArray = [], row;
        for (var i = 0; i < $scope.datosRcIva.length; i++) {
            row = $scope.datosRcIva[i];
            if (format === 'xlsx') {
                var objecto = {
                    codigo: row.rhEmpleadoCargo.rhEmpleado.codigo,
                    numeroItem: row.rhEmpleadoCargo.numeroItem,
                    nombreCompleto: row.rhEmpleadoCargo.rhEmpleado.nombreCompleto,
                    departamento: row.rhEmpleadoCargo.rhCargo.erpDepartamento.descripcion,
                    cargo: row.rhEmpleadoCargo.rhCargo.nombreCargo,
                    carnetIdentidad: row.rhEmpleadoCargo.rhEmpleado.numeroDocumento,
                    saldo: row.saldoAcumulado,
                    formulario110: row.monto
                };
                exportArray.push(objecto);
            }
        }

        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("Rc_Iva.xlsx",{headers:true}) FROM ?', [exportArray]);
        } else if (format === 'csv') {
            return exportArray;
        }
    };

    $scope.guardarRhRcIva= function () {
        console.log(JSON.stringify($scope.datosRcIva, null, 4));
        rhServices.modificaRhRcIva($scope.datosRcIva, {}, serverConf.ERPCONTA_WS, function (response) {
            console.log("Datos Guardados", response.data);
            $scope.showCustomModal({
                headerText: "Mensaje de Confirmacion",
                bodyText: "Los datos se guardaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 3000
            });

        });
    };

    initRcIva();
    /*****************************FIN RC - ICVA*******************************/


    /*****************************PRIMAS*******************************/

    function initPrimas() {
        obtenerPrimas($scope.idPeriodo, 'PRI');
    }

    function obtenerPrimas(idPeriodo, tipo) {
        rhServices.getRegistrosPorPeriodo({}, {}, idPeriodo, tipo, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.log("LISTA PRIMAS:", response.data);
            $scope.datosPrimas = response.data;
        }, function (responseError) {
            console.log(responseError);
        });
    }

    $scope.gridPrimas= {
        data: 'datosPrimas',
        enableRowSelection: true,
        enableCellSelection: false,
        enableColumnResize: true,
        multiSelect: false,
        enableSorting: true,
        footerTemplate: $scope.totalesTemplate,
        footerRowHeight: 66,
        headerRowHeight: 45,
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
                displayName: "Item",
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true
            },
            {
                field: 'rhEmpleadoCargo.rhEmpleado.nombreCompleto',
                displayName: "Nombre",
                width: '30%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'rhEmpleadoCargo.rhCargo.erpDepartamento.descripcion',
                displayName: 'Departamento',
                width: '25%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'rhEmpleadoCargo.rhCargo.nombreCargo',
                displayName: 'Cargo',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-left",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'rhEmpleadoCargo.rhEmpleado.numeroDocumento',
                displayName: 'Numero Documento',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellTemplate: $scope.currencyTemplateCinco
            },
            {
                field: 'montoPrima',
                displayName: 'Monto Prima',
                width: '10%',
                headerClass: "header-center",
                cellClass: "text-right",
                sortable: true,
                cellEditableCondition: true,
                cellTemplate: '<input type="number" ng-click="$event.stopPropagation()" currency-input decimals="2" class="form-control text-right" style="font-size: 100%" ng-input="COL_FIELD" ' +
                '             ng-model="COL_FIELD"/>'
            }
        ]
    };

    $scope.importarPrimasXLS = function (files) {
        if (files && files.length) {
            var data = {
                idPeriodoGestion: $scope.idPeriodo,
                tipoEntidad: 'PRI'
            };
            $scope.showLoader();
            rhServices.excelImport(files[files.length - 1], 'xls', serverConf.ERPCONTA_WS, data, function (response) {
                /*var xls = response.data,
                 row;*/
                $scope.datosPrimas = response.data;
                console.log(response.data);
                $scope.hideLoader();
            }, function () {
                $scope.hideLoader();
            });
        }
    };

    $scope.exportarPrimas= function (format) {
        var exportArray = [], row;
        for (var i = 0; i < $scope.datosPrimas.length; i++) {
            row = $scope.datosPrimas[i];
            if (format === 'xlsx') {
                var objecto = {
                    codigo: row.rhEmpleadoCargo.rhEmpleado.codigo,
                    numeroItem: row.rhEmpleadoCargo.numeroItem,
                    nombreCompleto: row.rhEmpleadoCargo.rhEmpleado.nombreCompleto,
                    departamento: row.rhEmpleadoCargo.rhCargo.erpDepartamento.descripcion,
                    cargo: row.rhEmpleadoCargo.rhCargo.nombreCargo,
                    carnetIdentidad: row.rhEmpleadoCargo.rhEmpleado.numeroDocumento,
                    montoPrima: row.montoPrima
                };
                exportArray.push(objecto);
            }
        }

        if (format === 'xlsx') {
            alasql('SELECT * INTO XLSX("prima.xlsx",{headers:true}) FROM ?', [exportArray]);
        } else if (format === 'csv') {
            return exportArray;
        }
    };

    $scope.guardarRhPrima= function () {
        console.log(JSON.stringify($scope.datosPrimas, null, 4));
        rhServices.modificaRhPrimas($scope.datosPrimas, {}, serverConf.ERPCONTA_WS, function (response) {
            console.log("Datos Guardados", response.data);
            $scope.showCustomModal({
                headerText: "Mensaje de Confirmacion",
                bodyText: "Los datos se guardaron correctamente.",
                actionButtonText: "Aceptar",
                type: 'exito',
                closeAfter: 3000
            });

        });
    };

    initPrimas();
    /*****************************FIN PRIMAS*******************************/


});