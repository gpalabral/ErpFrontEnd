'use strict';

app.factory('detalleFacturaGridModel', function (Model) {


    var detalleFacturaGridModel=function(){

        this.attrs = {
            "datosDetalleFactura": {
                "required": true,
                "type": "array",
                "subType": "object",
                "minLength": 1,
                "fields": {
                    "cpcItem": {
                        "type": "object",
                        "fields": {
                            "idItem": {
                                "required": false,
                                "type": "number",
                                "value": null
                            }
                        }
                    },
                    "precioUnitarioPrimeraMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "precioUnitarioSegundaMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "partidaArancelaria": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "porcentajeDescuento": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "descuentoPrimeraMoneda": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "descuentoSegundaMoneda": {
                        "required": false,
                        "type": "number",
                        "value": null
                    },
                    "detalleFactura": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "cantidad": {
                        "required": true,
                        "type": "number",
                        "value": 0,
                        "biggerThan":0
                    },
                    "unidadMedida": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    },
                    "subtotalSegundaMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "subtotalPrimeraMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            }
        };
    };


    detalleFacturaGridModel.prototype.getObject = function () {
        return Model.get( this.attrs, 'value' );
    };

    detalleFacturaGridModel.prototype.setObject = function ( dosificacion ) {
        Model.set( this.attrs, dosificacion, 'value' );
    };

    detalleFacturaGridModel.prototype.validate = function ( dosificacion ) {
        var self = this;
        self.setObject(dosificacion);
        return Model.validate(self.attrs);
    };

    return detalleFacturaGridModel;
});



/*
*/
