(function () {
    'use strict';

    angular.module('myApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('cxcEnBlanco', {
                    url: "cxc",
                    template: ""
                })
                .state('panelCliente', {
                    url: '/cliente',
                    templateUrl: 'modules/cxc/views/menuCliente.html',
                    controller: 'menuClienteCtrl'
                })
                .state('panelCliente.nuevo', {
                    url: '/nuevoCliente',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/tabCliente.html',
                            controller: 'tabClienteCtrl'
                        }
                    }
                })
                .state('panelCliente.editar', {
                    url: '/editarCliente/:idEntidadPojo',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/tabCliente.html',
                            controller: 'tabClienteDetalleCtrl'
                        }
                    }
                })
                .state('dosificacionEmisionFactura', {
                    url: '/dosificacionEmisionFactura',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/dosificacionEmisionFactura.html',
                            controller: 'dosificacionEmisionFacturaCtrl'
                        }
                    }
                })
                .state('emisionFactura', {
                    url: '/emisionFactura',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/emisionFactura.html',
                            controller: 'emisionFacturaCtrl'
                        }
                    }
                })
                .state('dosificacionFacturaExportacion', {
                    url: '/dosificacionFacturaExportacion',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/dosificacionFacturaExportacion.html',
                            controller: 'dosificacionFacturaExportacionCtrl'
                        }
                    }
                })
                .state('facturaComercialExportacion', {
                    url: '/facturaComercialExportacion',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/facturaComercialExportacion.html',
                            controller: 'facturaComercialExportacionCtrl'
                        }
                    }
                })
                .state('emisionFacturaContrato', {
                    url: '/emisionFacturaContrato',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/emisionFacturaContrato.html',
                            controller: 'emisionFacturaContratoCtrl'
                        }
                    }
                })
                .state('facturaViewer', {
                    url : '/facturaViewer/:idFacturaEmitida',
                    views : {
                        '' : {
                            templateUrl : 'views/pdfViewer.html',
                            controller : 'pdfViewerCtrl'
                        }
                    }
                })
                .state('facturaAnulada', {
                    url : '/facturaAnulada/:idFacturaEmitida',
                    views : {
                    '' : {
                        templateUrl : 'views/pdfViewer.html',
                        controller : 'pdfViewerCtrl'
                    }}
                })
                .state('facturaExportacion', {
                    url : '/facturaExportacion/:idFacturaEmitida',
                    views : {
                        '' : {
                            templateUrl : 'views/pdfViewer.html',
                            controller : 'pdfViewerCtrl'
                        }
                    }
                })
                .state('facturaExportacionNotaDebitoCredito',{
                    url: '/facturaExportacionNotaDebitoCredito/:idFacturaEmitida',
                    views: {
                        '' : {
                            templateUrl : 'views/pdfViewer.html',
                            controller : 'pdfViewerCtrl'
                        }
                    }
                })
                .state('facturaExtraviada', {
                    url : '/facturaExtraviada/:idFacturaEmitida',
                    views : {
                    '' : {
                        templateUrl : 'views/pdfViewer.html',
                        controller : 'pdfViewerCtrl'
                    }}
                })
                .state('facturaComputarizada', {
                    url: '/facturaComputarizada/:idFacturaEmitida',
                    views: {
                        '': {
                            templateUrl : 'views/pdfViewer.html',
                            controller : 'pdfViewerCtrl'
                        }
                    }
                })
                .state('pagoBancarizado', {
                    url: '/pagoBancarizado',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/pagoBancarizado.html',
                            controller: 'pagoBancarizadoCtrl'
                        }
                    }
                })
                .state('listaFacturaCliente', {
                    url: '/listaFacturaCliente',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/listaFacturaCliente.html',
                            controller: 'listaFacturaClienteCtrl'
                        }
                    }
                })
                .state('libroVentas', {
                    url: '/libroVentas',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/libroVentas.html',
                            controller: 'libroVentasCtrl'
                        }
                    }
                })
                .state('panelCobrosPorFacturar', {
                    url: '/menuContratoCliente',
                    templateUrl: 'modules/cxc/views/menuContratoCliente.html',
                    controller: 'menuContratoClienteCtrl'
                })
                .state('panelCobrosPorFacturar.detalle', {
                    url: '/cobrosPorFacturar/:idEntidadPojo',
                    views: {
                        'contratoCliente-panel': {
                            templateUrl: 'modules/cxc/views/cobrosPorFacturar.html',
                            controller: 'cobrosPorFacturarCtrl'
                        }
                    }
                })
                .state('panelFacturas', {
                    url: '/menuFacturas',
                    templateUrl: 'modules/cxc/views/menuFacturas.html',
                    controller: 'menuFacturasCtrl'
                })
                .state('panelFacturas.consulta', {
                    url: '/:idFacturaEmitida',
                    views: {
                        'consulta-Factura': {
                            templateUrl: 'modules/cxc/views/consultaFactura.html',
                            controller: 'consultaFacturaCtrl'
                        }
                    }
                })
                .state('serviciosCliente', {
                    url: "/servicios"
                })
                .state('sucursalTemplate', {
                    url: '/sucursalTemplate',
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/templateSucursal.html',
                            controller: 'templateSucursalCtrl'
                        }
                    }
                })
                .state('sucursalTemplate.empty', {
                    url: '',
                    views: {
                        'sucursal-panel': {
                            templateUrl: 'modules/cxc/views/tabSucursal.html',
                            controller: 'tabSucursalAdicionaCtrl'
                            //template: '<div></div>'
                        }
                    }
                })
                .state('sucursalTemplate.adiciona', {
                    url: '/sucursalTemplateAdiciona',
                    views: {
                        'sucursal-panel': {
                            templateUrl: 'modules/cxc/views/tabSucursal.html',
                            controller: 'tabSucursalAdicionaCtrl'
                        }
                    }
                })
                .state('sucursalTemplate.modifica', {
                    url: '/sucursalTemplateModifica/:idEntidadPojo',
                    views: {
                        'sucursal-panel': {
                            templateUrl: 'modules/cxc/views/tabSucursal.html',
                            controller: 'tabSucursalModificaCtrl'
                        }
                    }
                })
                .state('dosificacionTemplate', {
                    url: '/dosificacionTemplate',
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/templateDosificacion.html',
                            controller: 'templateDosificacionCtrl'
                        }
                    }
                })
                .state('dosificacionTemplate.empty', {
                    url: '',
                    views: {
                        'dosificacion-panel': {
                            templateUrl: 'modules/cxc/views/dosificacion.html',
                            controller: 'dosificacionCtrl'
                        }
                    }
                })
                .state('servicioTemplate', {
                    url: '/servicioTemplate',
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/templateServicio.html',
                            controller: 'templateServicioCtrl'
                        }
                    }
                })
                .state('servicioTemplate.empty', {
                    url: '',
                    views: {
                        'servicio-panel': {
                            templateUrl: 'modules/cxc/views/servicio.html',
                            controller: 'servicioAdicionaCtrl'
                            //template: '<div></div>'
                        }
                    }
                })
                .state('servicioTemplate.adiciona', {
                    url: '/servicioTemplateAdiciona',
                    views: {
                        'servicio-panel': {
                            templateUrl: 'modules/cxc/views/servicio.html',
                            controller: 'servicioAdicionaCtrl'
                        }
                    }
                })
                .state('servicioTemplate.modifica', {
                    url: '/servicioTemplateModifica/:idEntidadPojo',
                    views: {
                        'servicio-panel': {
                            templateUrl: 'modules/cxc/views/servicio.html',
                            controller: 'servicioModificaCtrl'
                        }
                    }
                })
                .state('contratoTemplate', {
                    url: '/contratoTemplate',
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/templateContrato.html',
                            controller: 'templateContratoCtrl'
                        }
                    }
                })
                .state('contratoTemplate.empty', {
                    url: '',
                    views: {
                        'contrato-panel': {
                            templateUrl: 'modules/cxc/views/contrato.html',
                            controller: 'contratoAdicionaCtrl'
                        }
                    }
                })
                .state('contratoTemplate.adiciona', {
                    url: '/contratoAdiciona',
                    views: {
                        'contrato-panel': {
                            templateUrl: 'modules/cxc/views/contrato.html',
                            controller: 'contratoAdicionaCtrl'
                        }
                    }
                })
                .state('contratoTemplate.modifica', {
                    url: '/contratoModifica/:idContrato',
                    views: {
                        'contrato-panel': {
                            templateUrl: 'modules/cxc/views/contrato.html',
                            controller: 'contratoModificaCtrl'
                        }
                    }
                })
                .state('tipoDeCambio', {
                    url: '/tipoDeCambio',
                    views: {
                        '' : {
                            templateUrl: 'modules/cxc/views/tipoDeCambio.html',
                            controller: 'tipoCambioCtrl'
                        }
                    }
                })
                .state('notaDeDebito', {
                    url: '/notaDeDebito',
                    templateUrl: 'modules/cxc/views/notasDeDebito.html'
                })
                .state('codigoControl', {
                    url: '/codigoControl',
                    views: {
                        '' : {
                            templateUrl: 'modules/cxc/views/codigoControl.html',
                            controller: 'codigoControlCtrl'
                        }
                    }
                })
                .state('listaFacturaClienteNotaDebitoCredito', {
                    url: '/listaFacturaClienteNotaDebitoCredito',
                    views: {
                        '' : {
                            templateUrl: 'modules/cxc/views/listaFacturaClienteNotaDebitoCredito.html',
                            controller: 'listaFacturaClienteNotaDebitoCreditoCtrl'
                        }
                    }
                })
                .state('emisionFacturaNotaDebitoCredito', {
                    url: '/emisionFacturaNotaDebitoCredito',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/emisionFacturaNotaDebitoCredito.html',
                            controller: 'emisionFacturaNotaDebitoCreditoCtrl'
                        }
                    }
                })
                .state('libroBancarizacionVentas', {
                    url: '/libroBancarizacionVentas',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/libroBancarizacionVentas.html',
                            controller: 'libroBancarizacionVentasCtrl'
                        }
                    }
                })
                .state('reporteVentas', {
                    url:'/reporteVentas',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/reporteVentas.html',
                            controller: 'reporteVentasCtrl'
                        }
                    }
                })
                .state('conciliacion', {
                    url: '/conciliacion',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/conciliacion.html',
                            controller:'conciliacionCtrl'
                        }
                    }
                })
                .state('paginaInicialMenu', {
                    url: '/paginaInicialMenu',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/paginaInicialMenu.html'
                        }
                    }
                })
                .state('controlIngresos', {
                    url: '/controlIngresos',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/controlIngresos.html',
                            controller:'controlIngresosCtrl'
                        }
                    }
                })
                .state('reporteGeneradoControlIng', {
                    url: '/reporteGeneradoControlIng',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/reporteGeneradoControlIng.html',
                            controller:'reporteGeneradoControlIngCtrl'
                        }
                    }
                })
                .state('conciliacionIngresos', {
                    url: '/conciliacionIngresos',
                    views: {
                        '': {
                            templateUrl: 'modules/cxc/views/conciliacionIngresos.html',
                            controller:'conciliacionIngresosCtrl'
                        }
                    }
                })
        }])
})();

