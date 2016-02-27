'use strict';

app.factory('itemModel', function (Model) {
    var itemModel = function () {
        this.attrs = {
            descripcion: {
                required: true,
                type: 'string',
                id: 'cpcItemDescripcion',
                value: ''
            },
            codigo: {
                required: true,
                type: 'string',
                id: "cpcItemCodigo",
                value: ''
            },
            idCtaIngreso: {
                required: true,
                type: 'int',
                value: '1'
            },
            precioUnitarioPrimeraMoneda: {
                required: true,
                type: 'number',
                id: 'precioUnitarioPrimeraMoneda',
                value: ''
            },
            precioUnitarioSegundaMoneda: {
                required: true,
                type: 'number',
                id: 'precioUnitarioSegundaMoneda',
                value: ''
            },
            montoFijo: {
                required: true,
                type: 'boolean',
                value: true
            },
            parTipoItem: {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'string',
                        value: 'BIE'
                    }
                }
            }
        };
    };

    itemModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    itemModel.prototype.setObject = function (item) {
        Model.set(this.attrs, item, 'value');
    };

    itemModel.prototype.validate = function (item) {
        var self = this;
        self.setObject(item);
        return Model.validate(self.attrs);
    };

    return itemModel;
});