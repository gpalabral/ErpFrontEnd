'use strict';

app.factory('rhParametrosModel', function (Model) {
    var rhParametrosModel = function () {
        this.attrs = {
            "idParametros": {
                "required": true,
                "type": "number",
                "value": null
            },
            "rhPeriodoGestion": {
                "type": "object",
                "fields": {
                    "idPeriodoGestion": {
                        "required": true,
                        "type": "number",
                        "value": null
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
                    }
                }
            },
            tipoCambio: {
                required: true,
                type: 'number',
                value: null
            },
            tipoUfv: {
                required: true,
                type: 'number',
                value: null
            },
            "numeroPatronal": {
                "required": true,
                "type": "string",
                "value": ""
            },
            sueldoMinimoNacional: {
                required: true,
                type: 'number',
                value: null
            },
            "numeroAguinaldos": {
                "required": true,
                "type": "number",
                "value": null
            },
            "numeroPrimas": {
                "required": true,
                "type": "number",
                "value": null
            },
            "horasNocturnas": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "fechaLiquidacion": {
                "required": true,
                "type": "date",
                "value": ""
            },
            "parTipoBonoAntiguedad": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": "3MIN"
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "rhEmpleadoEncargado": {
                "type": "object",
                "fields": {
                    "idEmpleado": {
                        "required": true,
                        "type": "number",
                        "value": undefined
                    }
                }
            },
            "rhCargoEncargado": {
                "type": "object",
                "fields": {
                    "idCargo": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                },
                "nombreCargo": {
                    "required": true,
                    "type": "string",
                    "value": ""
                }
            },
            "rhEmpleadoAprueba": {
                "type": "object",
                "fields": {
                    "idEmpleado": {
                        "required": true,
                        "type": "number",
                        "value": undefined
                    }
                }
            },
            "rhCargoAprueba": {
                "type": "object",
                "fields": {
                    "idCargo": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                },
                "nombreCargo": {
                    "required": true,
                    "type": "string",
                    "value": ""
                }
            },
            "cajaSalud": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "provivienda": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "infocal": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "afp": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "aporteSolidarioPatronales": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "fondoCapitalizacionIndividual": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "riesgoComun": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "comision": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "aporteSolidarioLaborales": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "rc_iva": {
                "required": true,
                "type": "number",
                "value": 0
            }
        };
    };

    rhParametrosModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    rhParametrosModel.prototype.setObject = function (rhParametros) {
        Model.set(this.attrs, rhParametros, 'value');
    };

    rhParametrosModel.prototype.validate = function (rhParametros) {
        var self = this;
        self.setObject(rhParametros);
        return Model.validate(self.attrs);
    };

    return rhParametrosModel;
});