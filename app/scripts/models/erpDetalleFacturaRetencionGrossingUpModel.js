'use strict';

app.factory('erpDetalleFacturaModel', function (Model) {
    var erpDetalleFacturaModel = function () {
        this.attrs = {
            "idDetalleFactura": {
                "required": true,
                "type": "number",
                "value": null
            },
            "erpFactura": {
                "type": "object",
                "fields": {
                    "idFactura": {
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
            "cppConcepto": {
                "type": "object",
                "fields": {
                    "idConcepto": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "erpNotaCreditoDebito": {
                "type": "object",
                "fields": {
                    "idNotaCreditoDebito": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "idPadre": {
                "required": true,
                "type": "number",
                "value": null
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
                "type": "object",
                "fields": {
                    "scale": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "precioUnitarioSegundaMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "porcentajeDescuento": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "descuentoPrimeraMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "descuentoSegundaMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "subtotalPrimeraMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "subtotalSegundaMoneda": {
                "type": "object",
                "fields": {
                    "scale": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precision": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
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
        };
    };

    erpDetalleFacturaModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    erpDetalleFacturaModel.prototype.setObject = function (erpDetalleFactura) {
        Model.set(this.attrs, erpDetalleFactura, 'value');
    };

    erpDetalleFacturaModel.prototype.validate = function (erpDetalleFactura) {
        var self = this;
        self.setObject(erpDetalleFactura);
        return Model.validate(self.attrs);
    };

    return erpDetalleFacturaModel;
});