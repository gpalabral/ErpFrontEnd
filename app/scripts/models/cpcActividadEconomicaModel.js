'use strict';

app.factory('cpcActividadEconomicaModel', function (Model) {
    var cpcActividadEconomicaModel = function () {
        this.attrs = {
            "idActividadEconomica": {
                "required": false,
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
            "estado": {
                "required": true,
                "type": "string",
                "value": "VIG"
            }
        };
    };

    cpcActividadEconomicaModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    cpcActividadEconomicaModel.prototype.setObject = function (cpcActividadEconomica) {
        Model.set(this.attrs, cpcActividadEconomica, 'value');
    };

    cpcActividadEconomicaModel.prototype.validate = function (cpcActividadEconomica) {
        var self = this;
        self.setObject(cpcActividadEconomica);
        return Model.validate(self.attrs);
    };

    return cpcActividadEconomicaModel;
});