'use strict';

app.factory('contratoItemModel', function (Model) {
    var contratoItemModel = function () {
        this.attrs = {
            cpcItem: {
                type: 'object',
                fields: {
                    idItem: {
                        required: true,
                        type: 'number',
                        value: ''

                    },
                    parTipoItem: {
                        type: 'object',
                        fields: {
                            codigo: {
                                required: true,
                                type: 'string',
                                value: ''
                            },
                            descripcion: {
                                required: true,
                                type: 'string',
                                value: ''
                            }
                        }
                    },
                    codigo: {
                        required: true,
                        type: 'String',
                        value: ''

                    },
                    descripcion: {
                        required: true,
                        type: 'String',
                        value: ''

                    }

                }
            },
            cpcContrato: {
                type: 'object',
                fields: {
                    idContrato: {
                        required: true,
                        type: 'number',
                        value: ''
                    }
                }
            },
            montoPrimeraMoneda: {
                required: true,
                type: 'number',
                value: ''
            },
            montoSegundaMoneda: {
                required: true,
                type: 'number',
                value: ''
            },
            cantidad: {
                required: true,
                type: 'number',
                value: ''
            },
            subtotalPrimeraMoneda: {
                required: true,
                type: 'number',
                value: null
            },
            subtotalSegundaMoneda: {
                required: true,
                type: 'number',
                value: null
            }

        };
    };

    contratoItemModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    contratoItemModel.prototype.setObject = function (contratoItem) {
        Model.set(this.attrs, contratoItem, 'value');
    };

    contratoItemModel.prototype.validate = function (contratoItem) {
        var self = this;
        self.setObject(contratoItem);
        return Model.validate(self.attrs);
    };

    return contratoItemModel;
});