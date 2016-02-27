(function () {
    'use strict';

    angular.module('myApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                // modulo de grupos
                .state('grupos', {
                    url: '/grupos',
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/index.html'
                        }
                    }
                })
                .state('grupos.empty', {
                    url: '',
                    views: {
                        'panel-grupo': {
                            templateUrl: 'modules/cxp/views/grupoList.html',
                            controller: 'grupoListCtrl'
                        },
                        'grupo-detalle': {
                            template: '<div></div>'
                        },
                        'panel-concepto': {
                            template: '<div></div>'
                        }
                    }
                })
                .state('grupos.alta', {
                    url: '/alta',
                    views: {
                        'panel-grupo': {
                            templateUrl: 'modules/cxp/views/grupoList.html',
                            controller: 'grupoListCtrl'
                        },
                        'grupo-detalle': {
                            templateUrl: 'modules/cxp/views/grupoAlta.html',
                            controller: 'grupoAltaCtrl'
                        },
                        'grupo-concepto': {
                            template: '<div></div>'
                        }
                    }
                })
                .state('grupos.detalle', {
                    url: '/detalle/:idGrupo',
                    views: {
                        'panel-grupo': {
                            templateUrl: 'modules/cxp/views/grupoList.html',
                            controller: 'grupoListCtrl'
                        },
                        'grupo-detalle': {
                            templateUrl: 'modules/cxp/views/grupoAlta.html',
                            controller: 'grupoDetalleCtrl'
                        },
                        'panel-concepto': {
                            templateUrl: 'modules/cxp/views/conceptoLista.html',
                            controller: 'conceptoListaCtrl'
                        }
                    }
                })
                .state('grupos.conceptoAlta', {
                    url: '/detalle/:idGrupo/conceptoAlta',
                    views: {
                        'panel-grupo': {
                            templateUrl: 'modules/cxp/views/grupoList.html',
                            controller: 'grupoListCtrl'
                        },
                        'grupo-detalle': {
                            templateUrl: 'modules/cxp/views/grupoAlta.html',
                            controller: 'grupoDetalleCtrl'
                        },
                        'panel-concepto': {
                            templateUrl: 'views/concepto.html',
                            controller: 'conceptoAltaCtrl'
                        }
                    }
                })
                .state('proveedorCliente', {
                    url: '/proveedorCliente',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/proveedorCliente.html',
                            controller: 'tabProveedorClienteCtrl'
                        }
                    }
                })
                .state('contacto', {
                    url: '/contacto',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/contacto.html',
                            controller: 'tabProveedorClienteCtrl'
                        }
                    }
                })
                .state('datosPagoAlta', {
                    url: '/datosPagoAlta',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/datosPagoAlta.html',
                            controller: 'tabProveedorClienteCtrl'
                        }
                    }
                })
                .state('proveedorConcepto', {
                    url: '/proveedorConcepto',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/proveedorConcepto.html',
                            controller: 'tabProveedorClienteCtrl'
                        }
                    }
                })
                .state('planPagos', {
                    url: '/planPagos',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/planPagos.html',
                            controller: 'planPagosCtrl'
                        }
                    }
                })

                .state('panelProveedorCliente', {
                    url: '/panelProveedorCliente',
                    templateUrl: 'modules/cxp/views/panelProveedorCliente.html',
                    controller: 'menuProveedorClienteCtrl'
                })
                .state('panelProveedorCliente.alta', {
                    url: '/altaProveedorCliente',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/tabProveedorCliente.html',
                            controller: 'tabProveedorClienteCtrl'
                        }
                    }
                })
                .state('panelProveedorCliente.detalle', {
                    url: '/altaProveedorClienteDetalle/:idEntidadPojo',
                    views: {

                        '': {
                            templateUrl: 'modules/cxp/views/tabProveedorCliente.html',
                            controller: 'tabProveedorClienteDetalleCtrl'
                        }
                    }
                })
                .state('registroFactura', {
                    url: '/registroFactura',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/registroFactura.html',
                            controller: 'registroFacturaCtrl'
                        }
                    }
                })
                .state('tipoCambio', {
                    url: '/tipoCambio',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/tipoCambio.html',
                            controller: 'tipoDeCambioCtrl'
                        }
                    }
                })

                .state('paginaInicialTipoCambio', {
                    url: '/paginaInicialTipoCambio',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/paginaInicialTipoCambio.html',
                            controller: 'paginaInicialCuentasPagarCtrl'
                        }
                    }
                })
                .state('panelProveedorConcepto', {
                    url: '/panelProveedorConcepto',
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/panelProveedorConcepto.html'
                        }
                    }
                })
                .state('panelProveedorConcepto.empty', {
                    url: '',
                    views: {
                        'menu-proveedorConcepto': {
                            templateUrl: 'modules/cxp/views/menuProveedorConcepto.html',
                            controller: 'menuProveedorConceptoCtrl'
                        },
                        'proveedorConcepto-alta': {
                            template: '<div></div>'
                        }
                    }
                })
                .state('buscadorConceptos', {
                    url: '/buscadorConceptos',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/buscadorConceptos.html',
                            controller: 'buscadorConceptosCtrl'
                        }
                    }
                })
                .state('conceptoProveedores', {
                    url: '/conceptoProveedores',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/conceptoProveedores.html',
                            controller: 'conceptoProveedoresCtrl'
                        }
                    }
                })
                .state('templateGrupo', {
                    url: '/templateGrupo',
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/templateGrupo.html',
                            controller: 'grupoTreeCtrl'
                        }
                    }
                })
                .state('templateGrupo.empty', {
                    url: '',
                    views: {
                        'grupo-panel': {
                            templateUrl: 'modules/cxp/views/grupoAdiciona.html',
                            controller: 'grupoAdicionaCtrl'
                            //template: '<div></div>'
                        }
                    }
                })
                .state('templateGrupo.adiciona', {
                    url: '/servicioTemplateAdiciona',
                    views: {
                        'grupo-panel': {
                            templateUrl: 'modules/cxp/views/grupoAdiciona.html',
                            controller: 'grupoAdicionaCtrl'
                        }
                    }
                })
                .state('templateGrupo.modifica', {
                    url: '/servicioTemplateModifica/:idEntidadPojo',
                    views: {
                        'grupo-panel': {
                            templateUrl: 'modules/cxp/views/grupo.html',
                            controller: 'grupoModificaCtrl'
                        }
                    }
                })
                //.state('gruposTree', {
                //    url: '/gruposTree',
                //    templateUrl: 'modules/cxp/views/templateGrupo.html',
                //    controller: 'grupoTreeCtrl'
                //})
                //.state('gruposTree.empty', {
                //    url: '',
                //    views: {
                //        '': {
                //            templateUrl: 'modules/cxp/views/grupo.html',
                //            controller: 'grupoAdicionaCtrl'
                //        }
                //    }
                //})
                //.state('gruposTree.adicion', {
                //    url: '/adicion',
                //    views: {
                //        '': {
                //            templateUrl: 'modules/cxp/views/grupo.html',
                //            controller: 'grupoAdicionaCtrl'
                //        }
                //    }
                //})
                //.state('gruposTree.modificaGrupo', {
                //    url: '/modifica/:idEntidadPojo',
                //    views: {
                //        '': {
                //            templateUrl: 'modules/cxp/views/grupo.html',
                //            controller: 'grupoModificaCtrl'
                //        }
                //    }
                //})
                .state('templateGrupo.adicionaConcepto', {
                    url: '/adiciona',
                    views: {
                        'grupo-panel': {
                            templateUrl: 'modules/cxp/views/concepto.html',
                            controller: 'conceptoAdicionaCtrl'
                        }
                    }
                })
                .state('templateGrupo.modificaConcepto', {
                    url: '/modifica/:idEntidadPojo',
                    views: {
                        'grupo-panel': {
                            templateUrl: 'modules/cxp/views/concepto.html',
                            controller: 'conceptoModificaCtrl'
                        }
                    }
                })
                .state('facturaAnularEliminar', {
                    url: '/facturaAnularEliminar',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/facturaAnularEliminar.html',
                            controller: 'facturaAnularEliminarCtrl'
                        }
                    }
                })
                .state('prefiltradoFactura', {
                    url: '/prefiltradoFactura',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/prefiltradoFactura.html',
                            controller: 'prefiltradoFacturaCtrl'
                        }
                    }
                })
                .state('libroCompras', {
                    url: '/libroCompras',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/libroCompras.html',
                            controller: 'libroComprasCtrl'
                        }
                    }
                })
                .state('prefiltradoSinFactura', {
                    url: '/prefiltradoSinFactura',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/prefiltradoSinFactura.html',
                            controller: 'prefiltradoSinFacturaCtrl'
                        }
                    }
                })
                .state('registroSinFactura', {
                    url: '/registroSinFactura',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/registroSinFactura.html',
                            controller: 'registroSinFacturaCtrl'
                        }
                    }
                })
                .state('parametrizacionAlicuotas', {
                    url: '/parametrizacionAlicuotas',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/parametrizacionAlicuotas.html',
                            controller: 'parametrizacionAlicuotasCtrl'
                        }
                    }
                })
                .state('listaBancarizacionCompras', {
                    url: '/listaBancarizacionCompras',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/listaBancarizacionCompras.html',
                            controller: 'listaBancarizacionComprasCtrl'
                        }
                    }
                })
                .state('registroRetencion', {
                    url: '/registroRetencion',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/registroRetencion.html',
                            controller: 'registroRetencionCtrl'
                        }
                    }
                })
                .state('documentoPago', {
                    url: '/documentoPago',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/documentoPago.html',
                            controller: 'documentoPagoCtrl'
                        }
                    }
                }).state('facturasBancarias', {
                    url: '/facturasBancarias',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/facturasBancarias.html',
                            controller: 'facturasBancariasCtrl'
                        }
                    }
                })
                .state('libroBancarizacionCompras', {
                    url: '/libroBancarizacionCompras',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/libroBancarizacionCompras.html',
                            controller: 'libroBancarizacionComprasCtrl'
                        }
                    }
                })
                .state('libroComprasNotaCreditoDebito', {
                    url: '/libroComprasNotaCreditoDebito',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/libroComprasNotaCreditoDebito.html',
                            controller: 'libroComprasNotaCreditoDebitoCtrl'
                        }
                    }
                })
                .state('verificaExistenciaDatosAlicuota', {
                    url: '/verificaExistenciaDatosAlicuota',
                    views: {
                        '': {
                            templateUrl: 'modules/cxp/views/verificaExistenciaDatosAlicuota.html',
                            controller: 'verificaExistenciaDatosAlicuotaCtrl'
                        }
                    }
                })
        }])
})();
