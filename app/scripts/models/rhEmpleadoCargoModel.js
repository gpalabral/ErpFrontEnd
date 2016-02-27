'use strict';

app.factory('rhEmpleadoCargoModel', function (Model) {
    var rhEmpleadoCargoModel = function () {
        this.attrs = {
            "idEmpleadoCargo": {
                "required": true,
                "type": "number",
                "value": null
            },
            "rhEmpleado": {
                "type": "object",
                "fields": {
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
                        "type": "date",
                        "value": ""
                    },
                    "nroSegSocial": {
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
                        "type": "date",
                        "value": ""
                    },
                    "fechaRetiro": {
                        "required": true,
                        "type": "date",
                        "value": ""
                    },
                    "fechaUltimaLiquidacion": {
                        "required": true,
                        "type": "date",
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
                        "value": null
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
                }
            },
            "rhCargo": {
                "type": "object",
                "fields": {
                    "idCargo": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "erpDepartamento": {
                        "type": "object",
                        "fields": {
                            "idDepartamento": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "sigla": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "descripcion": {
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
                                        "value": null
                                    },
                                    "descripcion": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    }
                                }
                            }
                        }
                    },
                    "rhSeccion": {
                        "type": "object",
                        "fields": {
                            "idSeccion": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "erpDepartamento": {
                                "type": "object",
                                "fields": {
                                    "idDepartamento": {
                                        "required": true,
                                        "type": "number",
                                        "value": null
                                    },
                                    "sigla": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "descripcion": {
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
                                                "value": null
                                            },
                                            "descripcion": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    }
                                }
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
                            }
                        }
                    },
                    "nombreCargo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "numeroItem": {
                "required": true,
                "type": "number",
                "value": null
            },
            sueldo: {
                required: true,
                type: 'number',
                value: null
            },

            "fechaInicio": {
                "required": true,
                "type": "date",
                "value": ""
            },
            "fechaFin": {
                "required": true,
                "type": "date",
                "value": ""
            },
            "idAntecesor": {
                "required": true,
                "type": "number",
                "value": null
            },
            "parTipoContratoEmpleado": {
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
            }
        };
    };

    rhEmpleadoCargoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    rhEmpleadoCargoModel.prototype.setObject = function (rhEmpleadoCargo) {
        Model.set(this.attrs, rhEmpleadoCargo, 'value');
    };

    rhEmpleadoCargoModel.prototype.validate = function (rhEmpleadoCargo) {
        var self = this;
        self.setObject(rhEmpleadoCargo);
        return Model.validate(self.attrs);
    };

    return rhEmpleadoCargoModel;
});