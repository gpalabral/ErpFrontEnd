'use strict';

app.factory('rhEmpleadoModel', function (Model) {
    var rhEmpleadoModel = function () {
        this.attrs = {
            "idEmpleado": {
                "required": true,
                "type": "number",
                "value": null
            },
            "codigo": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "nombre": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "primerApellido": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "segundoApellido": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "apellidoCasada": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "parEstado": {
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
            "parGenero": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": null
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "fechaNacimiento": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "parEstadoCivil": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": null
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "nacionalidad": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "parTipoDocumento": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": null
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "numeroDocumento": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "direccion": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "telefonoUno": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "telefonoDos": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "numeroCelular": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "profesion": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "parCondicionPension": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": null
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "aporta": {
                "required": true,
                "type": "boolean",
                "value": null
            },
            "parTipoAFP": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": null
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "fechaIngreso": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "fechaRetiro": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "fechaUltimaLiquidacion": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "idAntecesor": {
                "required": true,
                "type": "number",
                "value": null
            },
            "correoElectronico": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "expedido": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "parBanco": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": null
                    },
                    "descripcion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "nit": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "numeroCuentaBancaria": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "diasVacacion": {
                "required": true,
                "type": "number",
                "value": 0
            },
            "numeroSeguroSocial": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "nua": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "nombreCompleto": {
                "required": true,
                "type": "string",
                "value": ""
            }
        };
    };

    rhEmpleadoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    rhEmpleadoModel.prototype.setObject = function (rhEmpleado) {
        Model.set(this.attrs, rhEmpleado, 'value');
    };

    rhEmpleadoModel.prototype.validate = function (rhEmpleado) {
        var self = this;
        self.setObject(rhEmpleado);
        return Model.validate(self.attrs);
    };

    return rhEmpleadoModel;
});