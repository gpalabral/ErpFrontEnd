'use strict';

app.factory('cuentaBancariaProveedorClienteModel', function (Model) {
    var cuentaBancariaProveedorClienteModel = function () {
        this.attrs = {
            "idCuentaBancaria": {
                "required": false,
                "type": "number",
                "value": null
            },
            "parBanco": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "nit": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "numeroCuenta": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "parTipoMoneda": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
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
            "propietarioCuenta": {
                "required": false,
                "type": "string",
                "value": "CLI"
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

    cuentaBancariaProveedorClienteModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    cuentaBancariaProveedorClienteModel.prototype.setObject = function (cuentaBancariaProveedorCliente) {
        Model.set(this.attrs, cuentaBancariaProveedorCliente, 'value');
    };

    cuentaBancariaProveedorClienteModel.prototype.validate = function (cuentaBancariaProveedorCliente) {
        var self = this;
        self.setObject(cuentaBancariaProveedorCliente);
        return Model.validate(self.attrs);
    };

    return cuentaBancariaProveedorClienteModel;
});