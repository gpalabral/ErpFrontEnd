'use strict';

app.factory('contratoModel', function (Model) {
    var contratoModel = function () {
        this.attrs = {
            cppProveedorCliente: {
                type: 'object',
                fields: {
                    idProveedorCliente: {
                        required: true,
                        type: 'number',
                        value: ''

                    }
                }
            },
            cpcSucursal: {
                type: 'object',
                fields: {
                    idSucursal: {
                        required: true,
                        type: 'string',
                        value: ''

                    }
                }
            },
            fechaVigenciaInicio: {
                required: true,
                type: 'date',
                value: ''
            },
            montoPrimeraMoneda: {
                required: true,
                type: 'number',
                value: null
            },
            fechaVigenciaFin: {
                required: true,
                type: 'date',
                value: ''
            },
            montoSegundaMoneda: {
                required: true,
                type: 'number',
                value: null
            },
            nroCuotas: {
                required: true,
                type: 'number',
                value: 2
            },
            fechaContrato: {
                required: true,
                type: 'date',
                value: ''
            },
            nroContrato: {
                required: true,
                type: 'String',
                value: null
            },
            nroContratoCliente: {
                required: true,
                type: 'String',
                value: null
            },
            nombreContrato: {
                required: true,
                type: 'String',
                value: null
            },
            tipoCambio: {
                required: true,
                type: 'number',
                value: null
            },
            cuentaBancaria: {
                type: 'object',
                fields: {
                    idCuentaBancaria: {
                        required: true,
                        type: 'string',
                        value: ''

                    }
                }
            },
            parTipoMoneda: {
                type:'object',
                fields:{
                    "codigo": {
                        required:true,
                        type:'String',
                        value:''
                    }
                }
            }
        };
    };

    contratoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    contratoModel.prototype.setObject = function (contrato) {
        Model.set(this.attrs, contrato, 'value');
    };

    contratoModel.prototype.validate = function (contrato) {
        var self = this;
        self.setObject(contrato);
        return Model.validate(self.attrs);
    };

    return contratoModel;
});