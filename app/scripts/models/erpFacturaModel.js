'use strict';

app.factory('cpcFacturaModel', function (Model) {
    var cpcFacturaModel = function () {
        this.attrs = {
            "idFactura": {
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
                    }
                }
            },
            "idPadre": {
                "required": false,
                "type": "number",
                "value": null
            },
            "motivo": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "montoPrimeraMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "montoSegundaMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
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
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "gastosTransporte": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "gastosSeguro": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "totalFob": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "transporteInternacional": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "seguroInternacional": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "otrosGastos": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "idCbteContable": {
                "required": false,
                "type": "number",
                "value": null
            },
            "tipoCambioFactura": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "totalDescuentoPrimeraMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "totalDescuentoSegundaMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
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
                    },
                    "grupo": {
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
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "iceSegundaMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
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
            },
            "nroFacturaInterno": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "cuentaBancaria": {
                "type": "object",
                "fields": {
                    "idCuentaBancaria": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "fechaAceptacion": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "referenciado": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "batchNameDebitoFiscal": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "nroContrato": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "batchNameIngresos": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "cuentaContable": {
                "required": false,
                "type": "string",
                "value": ""
            },
            "parTipoModulo": {
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
            "erpAplicante": {
                "type": "object",
                "fields": {
                    "idAplicante": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "erpDepartamento": {
                        "type": "object",
                        "fields": {
                            "idDepartamento": {
                                "required": false,
                                "type": "number",
                                "value": null
                            }
                        }
                    }
                }
            },
            "parTipoAplicacionRetencion": {
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

    cpcFacturaModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    cpcFacturaModel.prototype.setObject = function (cpcFacturaEmitida) {
        Model.set(this.attrs, cpcFacturaEmitida, 'value');
    };

    cpcFacturaModel.prototype.validate = function (cpcFacturaEmitida) {
        var self = this;
        self.setObject(cpcFacturaEmitida);
        return Model.validate(self.attrs);
    };

    return cpcFacturaModel;
});