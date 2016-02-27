'use strict';

app.factory('facturasBancariasPojoModel', function (Model) {
    var facturasBancariasPojoModel = function () {
        this.attrs = {
            "idProveedorCliente": {
                "required": true,
                "type": "number",
                "value": null
            },
            "codigoModalidadTransaccion": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "codigoTipoCompra": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "codigoTipoDocumentoMercantil": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "listaFacturasBancarias": []
        };
    };

    facturasBancariasPojoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    facturasBancariasPojoModel.prototype.setObject = function (facturasBancariasPojo) {
        Model.set(this.attrs, facturasBancariasPojo, 'value');
    };

    facturasBancariasPojoModel.prototype.validate = function (facturasBancariasPojo) {
        var self = this;
        self.setObject(facturasBancariasPojo);
        return Model.validate(self.attrs);
    };

    return facturasBancariasPojoModel;
});