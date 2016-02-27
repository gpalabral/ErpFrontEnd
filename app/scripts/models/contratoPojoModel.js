'use strict';

app.factory('contratoModel', function (Model) {
    var contratoModel = function () {
        this.attrs = {

        };
    };

    contratoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    contratoModel.prototype.setObject = function (contrato) {
        Model.set(this.attrs, contrato, 'value');
    };

    contratoModel.prototype.validate = function (contrato) {
        var self = this;
        self.setObject(contrato);
        return Model.validate(self.attrs);
    };

    return contratoModel;
});