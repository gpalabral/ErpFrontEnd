(function () {
    'use strict';

    angular.module('myApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                // modulo de rh
                .state('rhEnBlanco', {
                    url: "rh",
                    template: ""
                })
                .state('ingresosDescuentos', {
                    url: '/tabIngresosDescuentos',
                    templateUrl: 'modules/rh/views/tabIngresosDescuentos.html',
                    controller: 'tabIngresosDescuentos'
                })
                .state('panelEmpleado', {
                    url: '/menuEmpleado',
                    templateUrl: 'modules/rh/views/menuEmpleado.html',
                    controller: 'menuEmpleadoCtrl'
                })
                .state('panelEmpleado.nuevo', {
                    url: '/nuevoEmpleado',
                    views: {
                        'personal-panel': {
                            templateUrl: 'modules/rh/views/tabFichaPersonalEmpleado.html',
                            controller: 'tabFichaPersonalEmpleadoCtrl'
                        }
                    }
                })
                .state('panelEmpleado.edita', {
                    url: '/modificaEmpleado/:idEmpleado',
                    views: {
                        'personal-panel': {
                            templateUrl: 'modules/rh/views/tabFichaPersonalEmpleadoEdita.html',
                            controller: 'tabFichaPersonalEmpleadoEditaCtrl'
                        }
                    }
                })
                .state('paginaInicialRecursosHumanos', {
                    url: '/paginaInicialRecursosHumanos',
                    views: {
                        '': {
                            templateUrl: 'modules/rh/views/paginaInicialRecursosHumanos.html',
                            controller: 'paginaInicialRecursosHumanosCtrl'
                        }
                    }
                })
                //.state('panelEmpleado.nuevo', {
                //    url: '/nuevoEmpleado',
                //    views: {
                //        'personal-panel': {
                //            templateUrl: 'modules/rh/views/datosPersonales.html',
                //            controller: 'datosPersonalesCtrl'
                //        }
                //    }
                //})

                .state('panelParamGeneral', {
                    url: '/panelParamGeneral',
                    templateUrl: 'modules/rh/views/panelParamGeneral.html',
                    controller: 'panelParamGeneralCtrl'
                })
                .state('descuentos', {
                    url: '/descuentos',
                    templateUrl: 'modules/rh/views/descuentos.html',
                    controller: 'descuentosCtrl'
                })
                .state('panelParamDescuentos', {
                    url: '/panelParamDescuentos',
                    templateUrl: 'modules/rh/views/panelParamDescuentos.html',
                    controller: 'panelParamDescuentosCtrl'
                })
                .state('panelParamCriterioDeIngreso', {
                    url: '/panelParamCriterioDeIngreso',
                    templateUrl: 'modules/rh/views/panelParamCriterioDeIngreso.html',
                    controller: 'panelParamCriterioDeIngresoCtrl'
                })
                .state('planillaSueldos', {
                    url: '/planillaSueldos',
                    templateUrl: 'modules/rh/views/planillaSueldos.html',
                    controller: 'planillaSueldosCtrl'
                })
                .state('planillaRcIva', {
                    url: '/planillaRcIva',
                    templateUrl: 'modules/rh/views/planillaRcIva.html',
                    controller: 'planillaRcIvaCtrl'
                })
                .state('empleadoImportacion', {
                    url: '/empleadoImportacion',
                    templateUrl: 'modules/rh/views/empleadoImportacion.html',
                    controller: 'empleadoImportacionCtrl'
                })
                .state('planillaAportesSociales', {
                    url: '/planillaAportesSociales',
                    templateUrl: 'modules/rh/views/planillaAportesSociales.html',
                    controller: 'planillaAportesSocialesCtrl'
                })
                .state('transferenciasBancarias', {
                    url: '/transferenciasBancarias',
                    templateUrl: 'modules/rh/views/reporteTransBancarias.html',
                    controller: 'reporteTransBancariasCtrl'
                })
            ;
        }]);
})();


