'use strict';

app.factory('pagoContratoModel', function (Model) {
	var pagoContratoModel = function () {
		this.attrs = {
            idPagoContrato : {
				required : false,
				type : 'number',
				value : '0'
			},
            descripcionPago : {
				required : true,
				type : 'string',
				value : ''
			},
            fechaProgramada : {
				required : true,
				type : 'date',
				value : null
			},
            montoProgramado : {
				required : true,
				type : 'number',
				value : null
			},
            montoProgramadoSegMoneda : {
				required : true,
				type : 'number',
				value : null
			},
            nroPago : {
				required : true,
				type : 'number',
				value : null
			},
            porcentajeProgramado : {
                required : true,
                type : 'number',
                value : 0
            },
            montoFacturado : {
                required : false,
                type : 'number',
                value : 0
            },
            montoFacturadoSegMoneda : {
                required : false,
                type : 'number',
                value : 0
            },
            montoPagadoPrimeraMoneda : {
                required : false,
                type : 'number',
                value : 0
            },
            montoPagadoSegundaMoneda : {
                required : false,
                type : 'number',
                value : 0
            },
            porcentajeFacturado : {
                required : false,
                type : 'number',
                value : 0
            },
            parEstadoPago: {
                type: 'object',
                fields: {
                    codigo: {
                        required: true,
                        type: 'String',
                        value: 'PEND'
                    },
                    descripcion: {
                        required: true,
                        type: 'String',
                        value: ''
                    }
                }
            },
            parTipoHito: {
                type: 'object',
                fields: {
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
            }
		};
	};

    pagoContratoModel.prototype.getObject = function () {
		return Model.get( this.attrs, 'value' );
	};

    pagoContratoModel.prototype.setObject = function ( pagoContrato ) {
		Model.set( this.attrs, pagoContrato, 'value' );
	};

    pagoContratoModel.prototype.validate = function ( pagoContrato ) {
		var self = this;
		self.setObject(pagoContrato);
		return Model.validate(self.attrs);
	};

	return pagoContratoModel;
});