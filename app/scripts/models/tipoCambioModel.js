'use strict';

app.factory('tipoCambioModel', function (Model) {
	var tipoCambioModel = function () {
		this.attrs = {
			monto : {
				required : true,
				type : 'number',
				value : 0
			},
			valorTipoCambio : {
				required : true,
				type : 'number',
				value : 0
			}
		};
	};

	tipoCambioModel.prototype.getObject = function () {
		return Model.get( this.attrs, 'value' );
	};

    tipoCambioModel.prototype.setData=function(monto,valorTipoCambio){
        this.attrs.monto.value=monto;
        this.attrs.valorTipoCambio.value=valorTipoCambio;

    };

	tipoCambioModel.prototype.setObject = function ( tipoCambio ) {
		Model.set( this.attrs, tipoCambio, 'value' );
	};

	tipoCambioModel.prototype.validate = function ( tipoCambio ) {
		var self = this;
		self.setObject(tipoCambio);
		return Model.validate(self.attrs);
	};

	return tipoCambioModel;
});

