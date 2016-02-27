'use strict';

app.factory('bancoClienteModel', function (Model) {
    var bancoClienteModel = function () {
        this.attrs = {
            parBancos: {
                type: 'object',
                fields: {
                    codigo: {
                        required: false,
                        type: 'string',
                        value: ''

                    }
                }
            },
            numeroCuenta: {
                required: false,
                type: 'date',
                value: ''
            },
            parTipoCuenta: {
                type: 'object',
                fields: {
                    codigo: {
                        required: false,
                        type: 'string',
                        value: ''

                    }
                }
            },
            cpcProveedorCliente:{
                type:'object',
                fields:{
                    idProveedorCliente:{
                        required:false,
                        type:'int',
                        value:null
                    }
                }
            },
            parTipoMoneda: {
                type: 'object',
                fields: {
                    codigo: {
                        required: false,
                        type: 'string',
                        value: ''

                    }
                }
            }
        };
    };

    bancoClienteModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    bancoClienteModel.prototype.setObject = function (bancoCliente) {
        Model.set(this.attrs, bancoCliente, 'value');
    };

    bancoClienteModel.prototype.validate = function (bancoCliente) {
        var self = this;
        self.setObject(bancoCliente);
        return Model.validate(self.attrs);
    };

    return bancoClienteModel;
});