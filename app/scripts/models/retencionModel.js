'use strict';

app.factory('retencionModel', function (Model) {
    var retencionModel = function () {
        this.attrs = {
            concepto: {
                required: true,
                type: 'string',
                value: ''
            },
            montoPrimeraMoneda: {
                required: true,
                type: 'number',
                value: null
            },
            montoSegundaMoneda: {
                required: true,
                type: 'number',
                value: null
            },
            iuePrimeraMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            iueSegundaMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            itPrimeraMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            itSegundaMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            ivaPrimeraMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            ivaSegundaMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            montoRemanentePrimeraMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            montoRemanenteSegundaMoneda: {
                required: true,
                type: 'number',
                value: 0
            },
            fechaRegistro: {
                required: true,
                type: 'Date',
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
            "parTipoTransaccion": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "grupo": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            parTipoAplicacionRetencion: {
                type:'object',
                fields:{
                    "codigo": {
                        required:true,
                        type:'String',
                        value:''
                    }
                }
            },
            parTipoRetencion: {
                type:'object',
                fields:{
                    "codigo": {
                        required:true,
                        type:'String',
                        value:''
                    }
                }
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
            erpAplicante: {
                "type": "object",
                "fields": {
                    "idAplicante": {
                        "required": true,
                        "type": "number",
                        "value": undefined
                    },
                    erpDepartamento: {
                        "type": "object",
                        "fields": {
                            "idDepartamento": {
                                "required": true,
                                "type": "number",
                                "value": undefined
                            }
                        }
                    }
                }
            },
            cppProveedorCliente: {
                "type": "object",
                "fields": {
                    "idAplicante": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            parEstadoRetencion: {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'String',
                        value: 'VIG'
                    }
                }
            },
            parModalidadTransaccion: {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'String',
                        value: 'CONT'
                    }
                }
            },
            "parEstadoPago": {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'String',
                        value: 'PEND'
                    }
                }
            }
        };
    };

    retencionModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    retencionModel.prototype.setObject = function (retencion) {
        Model.set(this.attrs, retencion, 'value');
    };

    retencionModel.prototype.validate = function (retencion) {
        var self = this;
        self.setObject(retencion);
        return Model.validate(self.attrs);
    };

    return retencionModel;
});