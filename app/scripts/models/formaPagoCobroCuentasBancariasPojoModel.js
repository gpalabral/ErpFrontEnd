'use strict';

app.factory('formaPagoCobroCuentasBancariasPojoModel', function (Model) {
    var formaPagoCobroCuentasBancariasPojoModel = function () {
        this.attrs = {
            "cppFormaPagoCobro": {
                "type": "object",
                "fields": {
                    "idFormaPagoCobro": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "limiteCredito": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "diasPagoCredito": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "parFormaDePago": {
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
                    "proveedorCombustible": {
                        "required": true,
                        "type": "boolean",
                        "value": false
                    },
                    "parEstado": {
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
                    "cppProveedorCliente": {
                        "type": "object",
                        "fields": {
                            "idProveedorCliente": {
                                "required": true,
                                "type": "number",
                                "value": null
                            }
                        }
                    }
                }
            },
            "listaCuentasBancarias": {
                "required": true,
                "type": "array",
                "value": []
            }
        };
    };

    formaPagoCobroCuentasBancariasPojoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    formaPagoCobroCuentasBancariasPojoModel.prototype.setObject = function (formaPagoCobroCuentasBancariasPojo) {
        Model.set(this.attrs, formaPagoCobroCuentasBancariasPojo, 'value');
    };

    formaPagoCobroCuentasBancariasPojoModel.prototype.validate = function (formaPagoCobroCuentasBancariasPojo) {
        var self = this;
        self.setObject(formaPagoCobroCuentasBancariasPojo);
        return Model.validate(self.attrs);
    };

    return formaPagoCobroCuentasBancariasPojoModel;
});