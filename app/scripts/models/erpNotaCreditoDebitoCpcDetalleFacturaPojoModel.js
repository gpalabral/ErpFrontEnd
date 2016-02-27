'use strict';

app.factory('erpNotaCreditoDebitoCpcDetalleFacturaPojoCpcDetalleFacturaPojoModel', function (Model) {
    var erpNotaCreditoDebitoCpcDetalleFacturaPojo = function () {
        this.attrs = {
            "erpNotaCreditoDebito": {
                "type": "object",
                "fields": {
                    "fechaNotaCreditoDebito": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "numeroNotaCreditoDebito": {
                        "required": true,
                        "type": "number",
                        "value": null
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
                    "parEstado": {
                        "type": "object",
                        "fields": {
                            "codigo": {
                                "required": true,
                                "type": "string",
                                "value": "VIG"
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
                    "importeTotalSegundaMoneda": {
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
                            }
                        }
                    }
                }
            },
            "listaCpcDetalleFactura": []
        };
    };

    erpNotaCreditoDebitoCpcDetalleFacturaPojo.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    erpNotaCreditoDebitoCpcDetalleFacturaPojo.prototype.setObject = function (item) {
        Model.set(this.attrs, item, 'value');
    };

    erpNotaCreditoDebitoCpcDetalleFacturaPojo.prototype.validate = function (item) {
        var self = this;
        self.setObject(item);
        return Model.validate(self.attrs);
    };

    return erpNotaCreditoDebitoCpcDetalleFacturaPojo;
});