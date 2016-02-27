'use strict';

app.factory('conciliacionPojoModel', function (Model) {
    var conciliacionPojoModel = function () {
        this.attrs = {
            numero: {
                required: true,
                type: 'number',
                value: null
            },
            fechaFactura: {
                required: true,
                type: 'date',
                value: ''
            },
            numeroDeFactura: {
                required: true,
                type: 'number',
                value: null
            },
            nroFacturaInterno: {
                required: true,
                type: 'string',
                value: null
            },
            debitoFiscal: {
                required: true,
                type: 'number',
                value: null
            },
            glDate: {
                required: true,
                type: 'date',
                value: null
            },
            batchName: {
                required: true,
                type: 'string',
                value: null
            },
            entryName: {
                required: true,
                type: 'string',
                value: null
            },
            credits: {
                required: true,
                type: 'string',
                value: null
            },
            conciliado: {
                required: true,
                type: 'string',
                value: null
            }
        };
    };

    conciliacionPojoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    conciliacionPojoModel.prototype.setObject = function (conciliacionPojo) {
        Model.set(this.attrs, conciliacionPojo, 'value');
    };

    conciliacionPojoModel.prototype.validate = function (conciliacionPojo) {
        var self = this;
        self.setObject(conciliacionPojo);
        return Model.validate(self.attrs);
    };

    return conciliacionPojoModel;
});