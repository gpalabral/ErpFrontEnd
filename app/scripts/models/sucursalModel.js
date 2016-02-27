'use strict';

app.factory('sucursalModel', function (Model) {


    var sucursalModel=function(){

        this.attrs = {
            emiteFactura:{
                required:true,
                type:'boolean',
                value:true
            },
            parMunicipio:{
                type:'object',
                fields:{
                    codigo:{
                        required:true,
                        type:'string',
                        value:''
                    }
                }
            },
            descripcion:{
                required:true,
                type:'string',
                value:''
            },
            codigo:{
                required:true,
                type:'string',
                value:''
            },
            numeroSucursal:{
                required:true,
                type:'int',
                value:null
            },
            parDepartamento:{
                type:'object',
                fields:{
                    codigo:{
                        required:true,
                        type:'string',
                        value:''
                    }
                }
            },
            parEstado:{
                type:'object',
                fields:{
                    codigo:{
                        required:true,
                        type:'string',
                        value:'VIG'
                    }
                }
            },
            direccion:{
                required:true,
                type:'string',
                value:''
            },
            telefonoUno:{
                required:true,
                type:'string',
                value:''
            },
            telefonoDos:{
                required:false,
                type:'string',
                value:''
            },
            nombreLocalizacion:{
                required:true,
                type:'string',
                value:''
            },
            parLocalizacion:{
                type:'object',
                fields:{
                    codigo:{
                        required:true,
                        type:'string',
                        value:''
                    }
                }
            }

        };
    };


    sucursalModel.prototype.getObject = function () {
		return Model.get( this.attrs, 'value' );
	};

    sucursalModel.prototype.setObject = function ( sucursal ) {
		Model.set( this.attrs, sucursal, 'value' );
	};

    sucursalModel.prototype.validate = function ( sucursal ) {
		var self = this;
		self.setObject(sucursal);
		return Model.validate(self.attrs);
	};

	return sucursalModel;
});