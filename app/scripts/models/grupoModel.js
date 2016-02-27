'use strict';

app.factory('grupoModel', function (Model) {
	var grupoModel = function () {
		this.attrs = {
			nombre : {
				required : true,
				type : 'string',
				value : ''
			},
			parRecurrencia : {
				type : 'object',
				fields : {
					codigo : {
						required : true,
						type : 'string',
						value : 'PER'
					}
				}
			},
			idCntEntidadCtaXPagar : {
				required : false,
				type : 'number',
				value : null
			},
			idCntEntidadDocXPagar : {
				required : false,
				type : 'number',
				value : null
			},
			idCntEntidadAnticipo : {
				required : false,
				type : 'number',
				value : null
			}
		};
	};

	grupoModel.prototype.getObject = function () {
		return Model.get( this.attrs, 'value' );
	};

	grupoModel.prototype.setObject = function ( grupo ) {
		Model.set( this.attrs, grupo, 'value' );
	};

	grupoModel.prototype.validate = function ( grupo ) {
		var self = this;
		self.setObject(grupo);
		return Model.validate(self.attrs);
	};

	return grupoModel;
});