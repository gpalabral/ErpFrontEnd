/**
 * Created by benjamin on 06-06-15.
 */

'use strict';

app.factory('datosPagoModel', function (Model) {
    var datosPagoModel = function () {
        this.attrs = {
            idFormaPagoCobro: {
                required: true,
                type: 'number',
                value: null
            },
            limiteCredito: {
                required: true,
                type: 'string',
                value: ''
            },
            parTipoMoneda: {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'string',
                        value: ''
                    }
                }
            },
            diasPagoCredito: {
                required: true,
                type: 'Date',
                value: ''
            },
            parFormaDePago : {
                type : 'object',
                fields : {
                    codigo : {
                        required : true,
                        type : 'string',
                        value : ''
                    }
                }
            },
            idBanco: {
                required: true,
                type: 'number',
                value: null
            },
            banco: {
                required: true,
                type: 'string',
                value: ''
            },
            numeroCuenta: {
                required: true,
                type: 'long',
                value: ''
            }
        };
    };

    datosPagoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    datosPagoModel.prototype.setObject = function (datosPago) {
        Model.set(this.attrs, datosPago, 'value');
    };

    datosPagoModel.prototype.validate = function (datosPago) {
        var self = this;
        self.setObject(datosPago);
        return Model.validate(self.attrs);
    };

    return datosPagoModel;
});