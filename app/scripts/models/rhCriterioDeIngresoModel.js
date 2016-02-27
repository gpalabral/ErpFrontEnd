'use strict';

app.factory('rhCriterioDeIngresoModel', function (Model) {
    var rhCriterioDeIngresoModel = function () {
        this.attrs = {
            "idCriterioDeIngreso": {
                "required": true,
                "type": "number",
                "value": null
            },
            "codigo": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "descripcion": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "parTipoAplicacionDescuentoCriterioDeIngreso": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            }
        };
    };

    rhCriterioDeIngresoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    rhCriterioDeIngresoModel.prototype.setObject = function (rhCriterioDeIngreso) {
        Model.set(this.attrs, rhCriterioDeIngreso, 'value');
    };

    rhCriterioDeIngresoModel.prototype.validate = function (rhCriterioDeIngreso) {
        var self = this;
        self.setObject(rhCriterioDeIngreso);
        return Model.validate(self.attrs);
    };

    return rhCriterioDeIngresoModel;
});