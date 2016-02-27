'use strict';

app.factory('planPagosPeriodoModel', function (Model) {
    var planPagosPeriodoModel = function () {
        this.attrs = {
            numeroDePagos: {
                required: false,
                type: 'Number',
                value: null
            },
            cantidadDias: {
                required: false,
                type: 'Number',
                value: null
            }
        };
    };

    planPagosPeriodoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    planPagosPeriodoModel.prototype.setObject = function (planPagosPeriodo) {
        Model.set(this.attrs, planPagosPeriodo, 'value');
    };

    planPagosPeriodoModel.prototype.validate = function (planPagosPeriodo) {
        var self = this;
        self.setObject(planPagosPeriodo);
        return Model.validate(self.attrs);
    };

    return planPagosPeriodoModel;
});