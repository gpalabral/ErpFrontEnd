'use strict';

app.factory('emisionFacturaEntidadModel', function (Model) {
    var emisionFacturaEntidadModel = function () {
        this.attrs = {
            "idFacturaEmitida": {
                "required": false,
                "type": "number",
                "value": null
            },
            "cppProveedorCliente": {
                "type": "object",
                "fields": {
                    "idProveedorCliente": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "parTipoProveedorCliente": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "razonSocial": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "nombre": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "primerApellido": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "segundoApellido": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "parTipoRegistro": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "direccion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "nit": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "cpcDosificacion": {
                "type": "object",
                "fields": {
                    "idDosificacion": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "numeroAutorizacion": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "numeroFacturaInicial": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "numeroFacturaFinal": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "numeroFacturaActual": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "llaveDosificacion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "fechaLimiteEmision": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "parEstadoProceso": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "parCaracteristicaEspecial": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "parActividadEconomica": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "cpcSucursal": {
                        "type": "object",
                        "fields": {
                            "idSucursal": {
                                "required": false,
                                "type": "number",
                                "value": null
                            },
                            "numeroSucursal": {
                                "required": false,
                                "type": "number",
                                "value": null
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "parModalidadFacturacion": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "parTipoDocumentoMercantil": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "fechaActivacion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "fechaSolicitud": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "idPadre": {
                "required": false,
                "type": "number",
                "value": null
            },
            "montoPrimeraMoneda": {
                "required": false,
                "type": "number",
                "value": null
            },
            "montoSegundaMoneda": {
                "required": false,
                "type": "number",
                "value": null
            },
            "fechaFactura": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "numeroFactura": {
                "required": false,
                "type": "number",
                "value": null
            },
            "parEstadoFactura": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "parTipoDocumentoMercantil": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "cpcPagoContrato": {
                "type": "object",
                "fields": {
                    "idPagoContrato": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "cpcContrato": {
                        "type": "object",
                        "fields": {
                            "idContrato": {
                                "required": false,
                                "type": "number",
                                "value": null
                            },
                            "cppProveedorCliente": {
                                "type": "object",
                                "fields": {
                                    "idProveedorCliente": {
                                        "required": false,
                                        "type": "number",
                                        "value": null
                                    },
                                    "parTipoProveedorCliente": {
                                        "type": "object",
                                        "fields": {
                                            "codigo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "razonSocial": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "nombre": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "primerApellido": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "segundoApellido": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "parEstado": {
                                        "type": "object",
                                        "fields": {
                                            "codigo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "parTipoRegistro": {
                                        "type": "object",
                                        "fields": {
                                            "codigo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "parTipoDocumento": {
                                        "type": "object",
                                        "fields": {
                                            "codigo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "numeroDocumento": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "sigla": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "direccion": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "telefonoUno": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "telefonoDos": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "numeroFax": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "numeroCelular": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "correoElectronico": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "direccionWeb": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "logo": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "fechaAniversario": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "nit": {
                                        "required": false,
                                        "type": "number",
                                        "value": null
                                    }
                                }
                            },
                            "cpcSucursal": {
                                "type": "object",
                                "fields": {
                                    "idSucursal": {
                                        "required": false,
                                        "type": "number",
                                        "value": null
                                    },
                                    "numeroSucursal": {
                                        "required": false,
                                        "type": "number",
                                        "value": null
                                    },
                                    "codigo": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "direccion": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "telefonoUno": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "telefonoDos": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "descripcion": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "emiteFactura": {
                                        "required": false,
                                        "type": "boolean",
                                        "value": false
                                    },
                                    "nombreLocalizacion": {
                                        "required": false,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "parEstado": {
                                        "type": "object",
                                        "fields": {
                                            "codigo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "parDepartamento": {
                                        "type": "object",
                                        "fields": {
                                            "codigo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "parMunicipio": {
                                        "type": "object",
                                        "fields": {
                                            "codigo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "grupo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "parLocalizacion": {
                                        "type": "object",
                                        "fields": {
                                            "codigo": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": false,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    }
                                }
                            },
                            "nroContrato": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "fechaContrato": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "fechaVigenciaInicio": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "fechaVigenciaFin": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "nroCuotas": {
                                "required": false,
                                "type": "number",
                                "value": null
                            },
                            "montoPrimeraMoneda": {
                                "required": false,
                                "type": "number",
                                "value": null
                            },
                            "montoSegundaMoneda": {
                                "required": false,
                                "type": "number",
                                "value": null
                            },
                            "tipoCambio": {
                                "required": false,
                                "type": "number",
                                "value": null
                            },
                            "nroContratoCliente": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "nroPago": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "descripcionPago": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "montoProgramado": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "montoProgramadoSegMoneda": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "fechaProgramada": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "montoFacturado": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "montoFacturadoSegMoneda": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "porcentajeProgramado": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "porcentajeFacturado": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "montoPagadoPrimeraMoneda": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "montoPagadoSegundaMoneda": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "parEstadoPago": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": false,
                                "type": "string",
                                "value": ""
                            }
                        }
                    }
                }
            },
            "codigoControl": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "incoterm": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "puertoDestino": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "valorBruto": {
                "required": false,
                "type": "number",
                "value": null
            },
            "gastosTransporte": {
                "required": false,
                "type": "number",
                "value": null
            },
            "gastosSeguro": {
                "required": false,
                "type": "number",
                "value": null
            },
            "totalFob": {
                "required": false,
                "type": "number",
                "value": null
            },
            "transporteInternacional": {
                "required": false,
                "type": "number",
                "value": null
            },
            "seguroInternacional": {
                "required": false,
                "type": "number",
                "value": null
            },
            "otrosGastos": {
                "required": false,
                "type": "number",
                "value": null
            },
            "idCbteContable": {
                "required": false,
                "type": "number",
                "value": null
            },
            "tipoCambioFactura": {
                "required": false,
                "type": "number",
                "value": null
            },
            "totalDescuentoPrimeraMoneda": {
                "required": false,
                "type": "number",
                "value": null
            },
            "totalDescuentoSegundaMoneda": {
                "required": false,
                "type": "number",
                "value": null
            },
            "parModalidadTransaccion": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "parTipoTransaccion": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "glosa": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "concepto": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "icePrimeraMoneda": {
                "required": false,
                "type": "number",
                "value": null
            },
            "iceSegundaMoneda": {
                "required": false,
                "type": "number",
                "value": null
            },
            "parEstadoPago": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            }
        };
    };

    emisionFacturaEntidadModel.prototype = {
        getObject: function () {
            return Model.get(this.attrs, 'value');
        },
        setObject: function (emisionFacturaEntidad) {
            Model.set(this.attrs, emisionFacturaEntidad, 'value');
        },
        validate: function (emisionFacturaEntidad) {
            var self = this;
            self.setObject(emisionFacturaEntidad);
            return Model.validate(self.attrs);
        }
    };

    return emisionFacturaEntidadModel;
});
