'use strict';

app.factory('formaPagoCobroModel', function (Model) {
    var formaPagoCobroModel = function () {
        this.attrs = {
            "idFormaPagoCobro": {
                "required": false,
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
                "required": false,
                "type": "boolean",
                "value": false
            },
            "parEstado": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": "VIG"
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
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            }
        };
    };

    formaPagoCobroModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    formaPagoCobroModel.prototype.setObject = function (formaPagoCobro) {
        Model.set(this.attrs, formaPagoCobro, 'value');
    };

    formaPagoCobroModel.prototype.validate = function (formaPagoCobro) {
        var self = this;
        self.setObject(formaPagoCobro);
        return Model.validate(self.attrs);
    };

    return formaPagoCobroModel;
});