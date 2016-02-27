'use strict';

app.factory('rhPeriodoGestionModel', function (Model) {
    var rhPeriodoGestionModel = function () {
        this.attrs = {
            "idPeriodoGestion": {
                "required": true,
                "type": "number",
                "value": null
            },
            "parEstadoPeriodoGestion": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": "VIG"
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "periodo": {
                "required": true,
                "type": "number",
                "value": null
            },
            "gestion": {
                "required": true,
                "type": "number",
                "value": null
            },
            "inicio": {
                "required": true,
                "type": "date",
                "value": ""
            },
            "fin": {
                "required": true,
                "type": "date",
                "value": ""
            }
        };
    };

    rhPeriodoGestionModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    rhPeriodoGestionModel.prototype.setObject = function (rhPeriodoGestion) {
        Model.set(this.attrs, rhPeriodoGestion, 'value');
    };

    rhPeriodoGestionModel.prototype.validate = function (rhPeriodoGestion) {
        var self = this;
        self.setObject(rhPeriodoGestion);
        return Model.validate(self.attrs);
    };

    return rhPeriodoGestionModel;
});