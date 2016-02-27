'use strict';

app.factory('proveedorModel', function (Model) {


    var proveedorModel=function(){

        this.attrs = {
            razonSocial:{
                required:true,
                type:'string',
                value:''
            },
            sigla:{
                required:true,
                type:'string',
                value:null
            },
            direccion:{
                required:true,
                type:'string',
                value:null
            },
            nit:{
                required:true,
                type:'int',
                value:null
            },
            fechaAniversario:{
                required:true,
                type:'date',
                value:null
            },
            telefonoUno:{
                required:true,
                type:'string',
                value:null
            },
            telefonoDos:{
                required:true,
                type:'string',
                value:null
            },
            numeroCelular:{
                required:true,
                type:'string',
                value:null
            },
            numeroFax:{
                required:true,
                type:'string',
                value:null
            },
            correoElectronico:{
                required:true,
                type:'string',
                value:null
            },
            direccionWeb:{
                required:true,
                type:'string',
                value:null
            },
            nombre:{
                required:true,
                type:'string',
                value:null
            },
            logo:{
                required:true,
                type:'string',
                value:null
            },
            idProveedorCliente: {
                required :true,
                type : 'number',
                value : ''
            },
            primerApellido:{
                required:true,
                type:'string',
                value:null
            },
            segundoApellido:{
                required:true,
                type:'string',
                value:null
            },
            numeroDocumento:{
                required:true,
                type:'string',
                value:null
            },
            parTipoProveedorCliente:{
                type:'object',
                fields:{
                    codigo:{
                        required:true,
                        type:'string',
                        value:'null'
                    }
                }
            },
            parTipoRegistro : {
                type : 'object',
                fields : {
                    codigo : {
                        required : true,
                        type : 'string',
                        value : 'PROV'
                    }
                }
            },
            parEstado : {
                type : 'object',
                fields : {
                    codigo : {
                        required : true,
                        type : 'string',
                        value : 'null'
                    }
                }
            },
            parTipoDocumento : {
                type : 'object',
                fields : {
                    codigo : {
                        required : true,
                        type : 'string',
                        value : 'CI'
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


    proveedorModel.prototype.getObject = function () {
        return Model.get( this.attrs, 'value' );
    };

    proveedorModel.prototype.setObject = function ( proveedor ) {
        Model.set( this.attrs, proveedor, 'value' );
    };

    proveedorModel.prototype.validate = function ( proveedor ) {
        var self = this;
        self.setObject(proveedor);
        return Model.validate(self.attrs);
    };

    return proveedorModel;
});
