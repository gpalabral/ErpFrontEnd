'use strict';

app.factory('cuentaBancariaEmpresaModel', function (Model) {
    var cuentaBancariaEmpresaModel = function () {
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
                "value": ""
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

    cuentaBancariaEmpresaModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    cuentaBancariaEmpresaModel.prototype.setObject = function (cuentaBancariaEmpresa) {
        Model.set(this.attrs, cuentaBancariaEmpresa, 'value');
    };

    cuentaBancariaEmpresaModel.prototype.validate = function (cuentaBancariaEmpresa) {
        var self = this;
        self.setObject(cuentaBancariaEmpresa);
        return Model.validate(self.attrs);
    };

    return cuentaBancariaEmpresaModel;
});