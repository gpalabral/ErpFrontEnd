'use strict';

app.factory('cpcFacturaEmitidaCpcDetalleFacturaPojoModel', function (Model) {
    var itemModel = function () {
        this.attrs = {
            "cpcFacturaEmitida": {
                "type": "object",
                "fields": {
                    "idFacturaEmitida": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "cppProveedorCliente": {
                        "type": "object",
                        "fields": {
                            "idProveedorCliente": {
                                "required": true,
                                "type": "number",
                                "value": null
                            }
                        }
                    },
                    "montoPrimeraMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "montoSegundaMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "fechaFactura": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "numeroFactura": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "parEstadoFactura": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "parTipoDocumentoMercantil": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "parModalidadTransaccion": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "parTipoTransaccion": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            }
                        }
                    }
                }
            },
            "listaCpcDetalleFactura": {
                "required": true,
                "type": "array",
                "subType": "object",
                "minLength": 0,
                "fields": {
                    "idDetalleFactura": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "cpcFacturaEmitida": {
                        "type": "object",
                        "fields": {
                            "idFacturaEmitida": {
                                "required": true,
                                "type": "number",
                                "value": null
                            }
                        }
                    },
                    "cpcItem": {
                        "type": "object",
                        "fields": {
                            "idItem": {
                                "required": true,
                                "type": "number",
                                "value": null
                            }
                        }
                    },
                    "cantidad": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "partidaArancelaria": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "unidadMedida": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "precioUnitarioPrimeraMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precioUnitarioSegundaMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "porcentajeDescuento": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "descuentoPrimeraMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "descuentoSegundaMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "subtotalPrimeraMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "subtotalSegundaMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "detalleFactura": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            }
        };
    };

    cpcFacturaEmitidaCpcDetalleFacturaPojoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    cpcFacturaEmitidaCpcDetalleFacturaPojoModel.prototype.setObject = function (cpcFacturaEmitidaCpcDetalleFacturaPojo) {
        Model.set(this.attrs, cpcFacturaEmitidaCpcDetalleFacturaPojo, 'value');
    };

    cpcFacturaEmitidaCpcDetalleFacturaPojoModel.prototype.validate = function (cpcFacturaEmitidaCpcDetalleFacturaPojo) {
        var self = this;
        self.setObject(cpcFacturaEmitidaCpcDetalleFacturaPojo);
        return Model.validate(self.attrs);
    };

    return cpcFacturaEmitidaCpcDetalleFacturaPojoModel;
});