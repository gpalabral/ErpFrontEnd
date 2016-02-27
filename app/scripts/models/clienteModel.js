/**
 * Created by javier on 26-05-15.
 */
'use strict';

app.factory('clienteModel', function (Model) {
    var clienteModel = function () {
        this.attrs = {

            parTipoProveedorCliente: {
                type:'object',
                fields:{
                    "codigo": {

                        required:true,
                        type:'String',
                        value:''
                    }
                }
            },
            razonSocial: {
                required: false,
                type: 'String',
                value: ''
            },
            nombre: {
                required: false,
                type: 'String',
                value: ''
            },
            primerApellido: {
                required: false,
                type: 'String',
                value: ''
            },
            segundoApellido: {
                required: false,
                type: 'String',
                value: ''
            },
            parTipoDocumento: {
                type: 'object',
                fields: {
                    codigo: {
                        required: false,
                        type: 'String',
                        value: 'CI'
                    }
                }
            },
            parEstado: {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'String',
                        value: 'VIG'
                    }
                }
            },
            parTipoRegistro: {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'String',
                        value: 'CLI'
                    }
                }
            },
            numeroDocumento: {
                required: false,
                type: 'String',
                value: ''
            },
            sigla: {
                required: false,
                type: 'String',
                value: ''
            },
            direccion: {
                required: false,
                type: 'String',
                value: ''
            },
            telefonoUno: {
                required: false,
                type: 'String',
                value: ''
            },
            telefonoDos: {
                required: false,
                type: 'String',
                value: ''
            },
            numeroFax: {
                required: false,
                type: 'String',
                value: ''
            },
            numeroCelular: {
                required: false,
                type: 'String',
                value: ''
            },
            correoElectronico: {
                required: false,
                type: 'String',
                value: ''
            },
            direccionWeb: {
                required: false,
                type: 'String',
                value: ''
            },
            logo: {
                required: false,
                type: 'String',
                value: ''
            },
            fechaAniversario: {
                required: false,
                type: 'Date',
                value: ''
            },
            nit: {
                required: false,
                type: 'Number',
                value: ''
            },
            parCliente: {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'String',
                        value: ''
                    }
                }
            },
            vendorNumber: {
                required: false,
                type: 'String',
                value: ''
            }
        };
    };

    clienteModel.prototype.getObject = function () {
        return Model.get( this.attrs, 'value' );
    };

    clienteModel.prototype.setObject = function ( cliente ) {
        Model.set( this.attrs, cliente, 'value' );
    };

    clienteModel.prototype.validate = function ( cliente ) {
        var self = this;
        self.setObject(cliente);
        return Model.validate(self.attrs);
    };

    return clienteModel;
});

