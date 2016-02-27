'use strict';

app.factory('dosificacionModel', function (Model) {


    var dosificacionModel=function(){

        this.attrs = {
            "cpcSucursal": {
                "type": "object",
                "fields": {
                    "idSucursal": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "llaveDosificacion": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "numeroAutorizacion": {
                "required": true,
                "type": "number",
                "value": null
            },
            "numeroFacturaInicial": {
                "required": true,
                "type": "number",
                "value": null
            },
            "fechaLimiteEmision": {
                "required": true,
                "type": "date",
                "value": ""
            },
            "fechaActivacion": {
                "required": false,
                "type": "date",
                "value": ""
            },
            "fechaSolicitud": {
                "required": false,
                "type": "date",
                "value": ""
            },
            "parEstadoProceso": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "cpcActividadEconomica": {
                "type": "object",
                "fields": {
                    "idActividadEconomica": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "parModalidadFacturacion": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion":{
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "parCaracteristicaEspecial": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": "NIN"
                    }
                }
            },
            "parTipoDocumentoMercantil": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            }
        };
    };


    dosificacionModel.prototype.getObject = function () {
		return Model.get( this.attrs, 'value' );
	};

    dosificacionModel.prototype.setObject = function ( dosificacion ) {
		Model.set( this.attrs, dosificacion, 'value' );
	};

    dosificacionModel.prototype.validate = function ( dosificacion ) {
		var self = this;
		self.setObject(dosificacion);
		return Model.validate(self.attrs);
	};

	return dosificacionModel;
});