'use strict';

app.factory('conceptoModel', function (Model) {
	var conceptoModel = function () {
		this.attrs = {
            "idConcepto": {
                "required": false,
                "type": "number",
                "value": 0
            },
            "descripcion": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "cppGrupo": {
                "type": "object",
                "fields": {
                    "idGrupo": {
                        "required": false,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "monto": {
                "required": false,
                "type": "number",
                "value": null
            },
            "parPeriodo": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            }
        };
	};

	conceptoModel.prototype.getObject = function () {
		return Model.get( this.attrs, 'value' );
	};

	conceptoModel.prototype.setObject = function ( concepto ) {
		Model.set( this.attrs, concepto, 'value' );
	};

	conceptoModel.prototype.validate = function ( concepto ) {
		var self = this;
		self.setObject(concepto);
		return Model.validate(self.attrs);
	};

	return conceptoModel;
});

