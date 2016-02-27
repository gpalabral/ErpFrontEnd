/**
 * Created by benjamin on 26-05-15.
 */

'use strict';

app.factory('contactoModel', function (Model) {


    var contactoModel=function(){

        this.attrs = {
            cppContacto:{
                type:'object',
                fields:{
                    idContacto:{
                        required:true,
                        type:'int',
                        value:null
                    }
                }
            },
            nombre:{
                required:true,
                type:'string',
                value:''
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
            telefono:{
                required:true,
                type:'string',
                value:null
            },
            correoElectronico:{
                required:true,
                type:'string',
                value:null
            },
            celular:{
                required:true,
                type:'string',
                value:null
            },
            parTipoContacto:{
                type:'object',
                fields:{
                    codigo:{
                        required:true,
                        type:'string',
                        value:'null'
                    }
                }
            }
        };
    };


    contactoModel.prototype.getObject = function () {
        return Model.get( this.attrs, 'value' );
    };

    contactoModel.prototype.setObject = function ( contacto ) {
        Model.set( this.attrs, contacto, 'value' );
    };

    contactoModel.prototype.validate = function ( contacto ) {
        var self = this;
        self.setObject(contacto);
        return Model.validate(self.attrs);
    };

    return contactoModel;
});
