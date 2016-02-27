'use strict';

app.factory('parTipoAlicuotaModel', function (Model) {
    var parTipoAlicuotaModel = function () {
        this.attrs = {
            codigo: {
                required: true,
                type: 'string',
                value: ''
            },
            descripcion: {
                required: true,
                type: 'string',
                value: ''
            },
            valor: {
                required: true,
                type: 'string',
                value: ''
            }
        };
    };

    parTipoAlicuotaModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    parTipoAlicuotaModel.prototype.setObject = function (parTipoAlicuota) {
        Model.set(this.attrs, parTipoAlicuota, 'value');
    };

    parTipoAlicuotaModel.prototype.validate = function (parTipoAlicuota) {
        var self = this;
        self.setObject(parTipoAlicuota);
        return Model.validate(self.attrs);
    };

    return parTipoAlicuotaModel;
});