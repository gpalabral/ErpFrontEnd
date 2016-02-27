'use strict';

app.factory('codigoControlModel', function (Model) {
    var codigoControlModel = function () {
        this.attrs = {
            nit: {
                required: true,
                type: 'int',
                value: ''
            },
            numeroFactura: {
                required: true,
                type: 'String',
                value: ''
            },
            numeroAutorizacion: {
                required: true,
                type: 'String',
                value: ''
            },
            fechaFactura: {
                required: true,
                type: 'String',
                value: ''
            },
            monto: {
                required: true,
                type: 'Number',
                value: ''
            },
            llaveDosificacion: {
                required: true,
                type: 'String',
                value: ''
            }
        };
    };

    codigoControlModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    codigoControlModel.prototype.setObject = function (codigoControl) {
        Model.set(this.attrs, codigoControl, 'value');
    };

    codigoControlModel.prototype.validate = function (codigoControl) {
        var self = this;
        self.setObject(codigoControl);
        return Model.validate(self.attrs);
    };

    return codigoControlModel;
});