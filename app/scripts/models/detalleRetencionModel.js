'use strict';

app.factory('detalleRetencionModel', function (Model) {
    var detalleRetencionModel = function () {
        this.attrs = {
            cpcRetencion:{
                type:'object',
                fields:{
                    idRetencion:{
                        required:true,
                        type:'int',
                        value:null
                    }
                }
            },
            concepto: {
                required: true,
                type: 'string',
                value: ''
            },
            montoDebitoPrimeraMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            montoDebitoSegundaMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            montoCreditoPrimeraMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            montoCreditoSegundaMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            parTipoAlicuota: {
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

    detalleRetencionModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    detalleRetencionModel.prototype.setObject = function (detalleRetencion) {
        Model.set(this.attrs, detalleRetencion, 'value');
    };

    detalleRetencionModel.prototype.validate = function (detalleRetencion) {
        var self = this;
        self.setObject(detalleRetencion);
        return Model.validate(self.attrs);
    };

    return detalleRetencionModel;
});