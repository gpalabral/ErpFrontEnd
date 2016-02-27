'use strict';

app.factory('erpNotaCreditoDebitoModel', function (Model) {
    var erpNotaCreditoDebito = function () {
        this.attrs = {
            "fechaNodaCreditoDebito": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "cpcDosificacion": {
                "type": "object",
                "fields": {
                    "idDosificacion": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "numeroNotaCreditoDebito": {
                "required": true,
                "type": "number",
                "value": null
            },
            "numeroAutorizacion": {
                "required": true,
                "type": "number",
                "value": null
            },
            "parEstado": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
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
            "importeTotalPrimeraMoneda": {
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
            "importeTotalSegundaMoneda": {
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
            "codigoControlNotaDebitoCredito": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "parModalidadTransaccion": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": "CRED"
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
                        "value": "VENT"
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "grupo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            }
        };
    };

    erpNotaCreditoDebito.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    erpNotaCreditoDebito.prototype.setObject = function (item) {
        Model.set(this.attrs, item, 'value');
    };

    erpNotaCreditoDebito.prototype.validate = function (item) {
        var self = this;
        self.setObject(item);
        return Model.validate(self.attrs);
    };

    return erpNotaCreditoDebito;
});