'use strict';

app.factory('retencionGrossingUpModel', function (Model) {
    var retencionGrossingUpModel = function () {
        this.attrs = {
            concepto: {
                required: true,
                type: 'string',
                value: ''
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
            },
            tipoCambio: {
                required: true,
                type: 'number',
                value: 0
            },
            montoPrimeraMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            montoSegundaMoneda: {
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
            },
            parTipoRetencionGrossing: {
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

    retencionGrossingUpModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    retencionGrossingUpModel.prototype.setObject = function (retencionGrossingUp) {
        Model.set(this.attrs, retencionGrossingUp, 'value');
    };

    retencionGrossingUpModel.prototype.validate = function (retencionGrossingUp) {
        var self = this;
        self.setObject(retencionGrossingUp);
        return Model.validate(self.attrs);
    };

    return retencionGrossingUpModel;
});