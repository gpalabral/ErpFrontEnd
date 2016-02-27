'use strict';

app.factory('userPermission', function (menuModulo, appConfig) {
    return {
        setPermissions: function (modulos) {
            var moduleLinks = {},
                modulePermissions,
                moduleKey,
                options,
                found,
                optIndex,
                links,
                code,
                link,
                i;
            // iterating all modules
            for (moduleKey in menuModulo.menu) {
                if (menuModulo.menu.hasOwnProperty(moduleKey)) {
                    options = menuModulo.menu[moduleKey]['menuModulo'];
                    // iterating options in a specific module
                    for (optIndex = 0; optIndex < options.length; optIndex++) {
                        links = options[optIndex]['menu'];
                        // iterating access of each option that is inside a module :P
                        for (i = 0; i < links.length; i++) {
                            link = links[i];
                            moduleLinks[link.code] = link;
                            moduleLinks[link.code]['permission'] = !!appConfig['DEV_ENVIRONMENT'];
                        }
                    }
                }
            }

            for (moduleKey in modulos) {
                if (modulos.hasOwnProperty(moduleKey)) {
                    modulePermissions = modulos[moduleKey];
                    for (i = 0; i < modulePermissions.length; i++) {
                        code = modulePermissions[i];
                        if (moduleLinks.hasOwnProperty(code)) {
                            moduleLinks[code]['permission'] = moduleLinks.hasOwnProperty(code);
                        }
                    }
                }
            }

            for (moduleKey in menuModulo.menu) {
                if (menuModulo.menu.hasOwnProperty(moduleKey)) {
                    options = menuModulo.menu[moduleKey]['menuModulo'];
                    // iterating options in a specific module
                    for (optIndex = 0; optIndex < options.length; optIndex++) {
                        links = options[optIndex]['menu'];
                        found = false;
                        // iterating access of each option that is inside a module :P
                        for (i = 0; i < links.length; i++) {
                            link = links[i];
                            if (link.permission === true) {
                                found = true;
                                break;
                            }
                        }
                        options[optIndex].hasPermission = found;
                    }
                }
            }
        },
        setSpecialPermission: function (userData) {
            var defaultStatus = !!appConfig['DEV_ENVIRONMENT'],
            specialPermission = {
                anulacionFacturas: defaultStatus,
                eliminacionPlanilla: defaultStatus
            };

            var permisos, i;
            if( userData && userData.modulos ) {
                if( userData.modulos['CUENTAS POR COBRAR'] ) {
                    permisos = userData.modulos['CUENTAS POR COBRAR'];
                    for(i = 0; i < permisos.length; i++) {
                        if( permisos[i] === "ANULACION_FACTURAS") {
                            specialPermission['anulacionFacturas'] = true;
                        }
                    }
                }
                if( userData.modulos['RECURSOS HUMANOS'] ) {
                    permisos = userData.modulos['RECURSOS HUMANOS'];
                    for(i = 0; i < permisos.length; i++) {
                        if( permisos[i] === "RH_ELIMINACION_PLANILLA") {
                            specialPermission['eliminacionPlanilla'] = true;
                        }
                    }
                }
            }

            return specialPermission;
        },
        getPermissionsOn: function (linkCode) {

        }
    };
});


app.factory('sharingData', function () {
    return {
        mainMenu: [
            /*{
             permission : false,
             nombre : 'Contabilidad',
             code: 'CONTABILIDAD',
             containerClass : 'col-sm-6 col-md-6',
             class : 'thumbnail tile tile-medium tile-green',
             state : '',
             id: 'menuHome',
             customEvent : '',
             iconClass : 'fa fa-3x fa-home'
             },*/
            {
                permission: false,
                nombre: 'Facturación por Compras',
                code: 'CUENTAS POR PAGAR',
                containerClass: 'col-sm-6 col-md-5',
                class: 'thumbnail tile tile-medium tile-orange',
                id: 'menuCuentasPagar',
                customEvent: 'showModalTipoCambio',
                iconClass: 'fa fa-3x fa-money'
            },
            {
                permission: false,
                nombre: 'Facturación por Ventas',
                code: 'CUENTAS POR COBRAR',
                containerClass: 'col-sm-6 col-md-5',
                class: 'thumbnail tile tile-medium tile-orange',
                state: '',
                id: 'menuCuentasCobrar',
                customEvent: 'showModalTipoCambioCxC',
                iconClass: 'fa fa-3x fa-money'
            },
            {
                permission: false,
                nombre: 'Tax Payroll',
                code: 'RECURSOS HUMANOS',
                containerClass: 'col-sm-6 col-md-5',
                class: 'thumbnail tile tile-medium tile-orange',
                state: '',
                id: 'cpanel',
                customEvent: 'recursosHumanos',
                iconClass: 'fa fa-3x fa-money'
            },
            {
                permission: false,
                nombre: 'Disponible BAP',
                containerClass: 'col-sm-6 col-md-3',
                class: 'thumbnail tile tile-medium tile-orange',
                state: '',
                id: 'menuCuatro',
                customEvent: '',
                iconClass: 'fa fa-3x fa-microphone'
            },
            {
                permission: false,
                nombre: 'Disponible BAP',
                containerClass: 'col-sm-6 col-md-4',
                class: 'thumbnail tile tile-medium tile-orange',
                state: '',
                id: 'menuCinco',
                customEvent: '',
                iconClass: 'fa fa-3x fa-camera'
            },
            {
                permission: false,
                nombre: 'CPanel',
                code: 'CPANEL',
                containerClass: 'col-sm-6 col-md-5',
                class: 'thumbnail tile tile-medium tile-orange',
                state: '',
                id: 'cpanel',
                customEvent: 'cpanel',
                iconClass: 'fa fa-3x fa-cog'
            }
        ]
    }
});

app.factory('menuModulo', function () {
    return {
        menu: {
            CXP: {
                nombreModulo: 'Facturación por Compras',
                menuModulo: [
                    {
                        mainLabel: 'Configuración',
                        url: '',
                        hasPermission: undefined,
                        menu: [
                            /*{
                             label: 'Grupos',
                             url : '#/templateGrupo'
                             },*/
                            {
                                label: 'Proveedores',
                                code: 'PROVEEDORES',
                                permission: '',
                                url: '#/panelProveedorCliente'
                            },
                            {
                                label: 'Alícuotas',
                                code: 'ALICUOTAS',
                                permission: '',
                                url: '#/parametrizacionAlicuotas'
                            }
                        ]
                    },
                    {
                        mainLabel: 'Registro de Compras',
                        url: '',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Factura',
                                code: 'FACTURA',
                                permission: '',
                                url: '#/registroFactura'
                            },
                            {
                                label: 'Retenciones',
                                code: 'RETENCIONES',
                                permission: '',
                                url: '#/verificaExistenciaDatosAlicuota'
                            }/*,
                             {
                             label: 'Opciones',
                             code: '',
                             permission: '',
                             url: '#/facturaAnularEliminar'
                             }*/
                        ]
                    },
                    {
                        mainLabel: 'Bancarización',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Registro de Documento de Pago',
                                code: 'REG_DOC_PAGO_VENTAS',
                                permission: '',
                                url: '#/listaBancarizacionCompras'
                            },
                            {
                                label: 'Libro Bancarización por Compras',
                                code: 'LIBRO_BANCA_COMPRAS',
                                permission: '',
                                url: '#/libroBancarizacionCompras'
                            }
                        ]
                    },
                    {
                        mainLabel: 'Reportes',
                        url: '',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Libro de Compras Estándar',
                                code: 'LIBRO_COMPRAS_EST',
                                permission: '',
                                url: '#/libroCompras'
                            },
                            {
                                label: 'Libro de Compras Notas Crédito-Débito',
                                code: 'LIBRO_COMP_DEB_CRED',
                                permission: '',
                                url: '#/libroComprasNotaCreditoDebito'
                            },
                            {
                                label: 'Importar Facturas',
                                code: 'IMP_FACTURAS',
                                permission: '',
                                url: '#/facturasBancarias'
                            }
                        ]
                    }
                ]
            },
            CXC: {
                nombreModulo: 'Facturación por Ventas',
                menuModulo: [
                    {
                        mainLabel: 'Gestión',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Clientes',
                                code: 'CLIENTE',
                                permission: '',
                                url: '#/cliente'
                            },
                            {
                                label: 'Sucursales - Dosificaciones',
                                code: 'SUCURSAL',
                                permission: '',
                                url: '#/sucursalTemplate'
                            },
                            {
                                label: 'Bienes o Servicios',
                                code: 'SERVICIOS',
                                permission: '',
                                url: '#/servicioTemplate'
                            },
                            {
                                label: 'Contratos',
                                code: 'CONTRATOS',
                                permission: '',
                                url: '#/contratoTemplate'
                            },
                            /*{
                             label: 'Tipo de Cambio',
                             url: '#/tipoDeCambio'
                             },*/
                            {
                                label: 'Código de Control',
                                code: 'COD_CONTROL',
                                permission: '',
                                url: '#/codigoControl'
                            }
                        ]
                    },
                    {
                        mainLabel: 'Facturación',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Emisión/Registro Factura',
                                code: 'REG_FACTURA',
                                permission: '',
                                url: '#/dosificacionEmisionFactura'
                            },
                            {
                                label: 'Emisión/Registro Factura por Contrato',
                                code: 'REG_FACTURA_CONTRATO',
                                permission: '',
                                url: '#/menuContratoCliente'
                            },
                            {
                                label: 'Emisión Factura Comercial de Exportación',
                                code: 'REG_FACTURA_EXPORTACION',
                                permission: '',
                                url: '#/dosificacionFacturaExportacion'
                            },
                            {
                                label: 'Opciones de Factura',
                                code: 'OPCIONES_FACTURA',
                                permission: '',
                                url: '#/menuFacturas'
                            },
                            {
                                label: 'Notas de Crédito-Débito',
                                code: 'NOTA_CREDITO_DEBITO',
                                permission: '',
                                url: '#/listaFacturaClienteNotaDebitoCredito'
                            }
                        ]
                    },
                    {
                        mainLabel: 'Bancarización',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Registro de Documento de Pago',
                                code: 'REG_DOC_PAGO_COMPRAS',
                                permission: '',
                                url: '#/listaFacturaCliente'
                            },
                            {
                                label: 'Libro Bancarización por Ventas',
                                code: 'LIBRO_BAN_VENTAS',
                                permission: '',
                                url: '#/libroBancarizacionVentas'
                            }
                        ]
                    },
                    {
                        mainLabel: 'Reportes & Referenciación Contable',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Libro de Ventas',
                                code: 'LIBRO_VENTAS',
                                permission: '',
                                url: '#/libroVentas'
                            },
                            {
                                label: 'Reporte de Ventas',
                                code: 'REPORTE_VENTAS',
                                permission: '',
                                url: '#/reporteVentas'
                            },
                            {
                                label: 'Referencia a Mayor Débito Fiscal',
                                code: 'REF_MAY_DEB_FISCAL',
                                permission: '',
                                url: '#/conciliacion'
                            },
                            {
                                label: 'Referencia a Mayor de Ingresos',
                                code: 'REF_MAY_INGRESOS',
                                permission: '',
                                url: '#/conciliacionIngresos'
                            },
                            {
                                label: 'Generación de Reportes para Control de Ingresos',
                                code: 'CONTROL_INGRESOS',
                                permission: '',
                                url: '#/controlIngresos'
                            }
                        ]
                    }
                ]
            },
            CPANEL: {
                nombreModulo: 'Panel de Control',
                menuModulo: [
                    {
                        mainLabel: 'CPanel',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Usuarios',
                                code: '',
                                permission: '',
                                url: '#/usuarios'
                            },
                            {
                                label: 'Roles',
                                code: '',
                                permission: '',
                                url: '#/roles'
                            },
                            {
                                label: 'Empresa',
                                code: '',
                                permission: '',
                                url: '#/empresa'
                            }
                        ]
                    }
                ]
            },
            RH: {
                nombreModulo: 'Tax Payroll',
                menuModulo: [
                    {
                        mainLabel: 'Configuración',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'General',
                                code: 'RH_GENERAL',
                                permission: '',
                                url: '#/panelParamGeneral'
                            },
                            {
                                label: 'Descuentos',
                                code: 'RH_DESCUENTOS',
                                permission: '',
                                url: '#/panelParamDescuentos'
                            },
                            {
                                label: 'Conceptos por Ingreso',
                                code: 'RH_CRITERIOS_ING',
                                permission: '',
                                url: '#/panelParamCriterioDeIngreso'
                            }
                        ]
                    },
                    {
                        mainLabel: 'Empleado',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Ficha de Personal',
                                code: 'RH_FICHA_PERSONAL',
                                permission: '',
                                url: '#/menuEmpleado'
                            }/*,
                            {
                                label: 'Importación de Empleados',
                                code: 'RH_ELIMINACION_PLANILLA',
                                permission: '',
                                url: '#/empleadoImportacion'
                            }*/
                        ]
                    },
                    {
                        mainLabel: 'Registro',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Ingresos/Descuentos',
                                code: 'RH_INGRESOS_DCTOS',
                                permission: '',
                                url: '#/tabIngresosDescuentos'
                            }
                        ]
                    },
                    {
                        mainLabel: 'Liquidación',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Generar Planilla de Sueldos',
                                code: 'RH_PLANILLA_INGRESOS',
                                permission: '',
                                url: '#/planillaSueldos'
                            },
                            {
                                label: 'Generar Planilla Impositiva RC-IVA',
                                code: 'RH_PLANILLA_IMPOSITIVA',
                                permission: '',
                                url: '#/planillaRcIva'
                            },
                            {
                                label: 'Generar Planilla de Aportes a la Seguridad Social',
                                code: '',
                                permission: '',
                                url: '#/planillaAportesSociales'
                            }
                        ]
                    },
                    {
                        mainLabel: 'Reportes',
                        hasPermission: undefined,
                        menu: [
                            {
                                label: 'Transferencias Bancarias',
                                code: '',
                                permission: '',
                                url: '#/transferenciasBancarias'
                            }
                        ]
                    }
                ]
            }
        }
    };
});