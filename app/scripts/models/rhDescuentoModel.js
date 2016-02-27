'use strict';

app.factory('rhDescuentoModel', function (Model) {
    var rhDescuentoModel = function () {
        this.attrs = {
            "idDescuento": {
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

    rhDescuentoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    rhDescuentoModel.prototype.setObject = function (rhDescuento) {
        Model.set(this.attrs, rhDescuento, 'value');
    };

    rhDescuentoModel.prototype.validate = function (rhDescuento) {
        var self = this;
        self.setObject(rhDescuento);
        return Model.validate(self.attrs);
    };

    return rhDescuentoModel;
});