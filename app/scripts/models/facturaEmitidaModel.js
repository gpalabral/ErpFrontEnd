'use strict';

app.factory('facturaEmitidaModel', function (Model) {
    var facturaEmitidaModel = function () {
        this.attrs = {
            "idFacturaEmitida": {
                "required": true,
                "type": "number",
                "value": null
            },
            "cppProveedorCliente": {
                "type": "object",
                "fields": {
                    "idProveedorCliente": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "parTipoProveedorCliente": {
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
                    },
                    "razonSocial": {
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
                    "parEstado": {
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
                    },
                    "parTipoRegistro": {
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
                    },
                    "parTipoDocumento": {
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
                    },
                    "numeroDocumento": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "sigla": {
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
                    "numeroFax": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "numeroCelular": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "correoElectronico": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "direccionWeb": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "logo": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "fechaAniversario": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "nit": {
                        "required": true,
                        "type": "number",
                        "value": null
                    }
                }
            },
            "cpcDosificacion": {
                "type": "object",
                "fields": {
                    "idDosificacion": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "numeroAutorizacion": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "numeroFacturaInicial": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "numeroFacturaFinal": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "numeroFacturaActual": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "llaveDosificacion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "fechaLimiteEmision": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "parEstadoProceso": {
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
                    },
                    "parCaracteristicaEspecial": {
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
                    },
                    "parActividadEconomica": {
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
                    },
                    "cpcSucursal": {
                        "type": "object",
                        "fields": {
                            "idSucursal": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "numeroSucursal": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "codigo": {
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
                            "descripcion": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "emiteFactura": {
                                "required": true,
                                "type": "boolean",
                                "value": false
                            },
                            "nombreLocalizacion": {
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
                                        "value": ""
                                    },
                                    "descripcion": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    }
                                }
                            },
                            "parDepartamento": {
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
                            },
                            "parMunicipio": {
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
                                    },
                                    "grupo": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    }
                                }
                            },
                            "parLocalizacion": {
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
                        }
                    },
                    "parModalidadFacturacion": {
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
                    },
                    "parTipoDocumentoMercantil": {
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
                    },
                    "fechaActivacion": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "fechaSolicitud": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "idPadre": {
                "required": true,
                "type": "number",
                "value": null
            },
            "motivo": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "montoPrimeraMoneda": {
                "required": true,
                "type": "number",
                "value": null
            },
            "montoSegundaMoneda": {
                "required": true,
                "type": "number",
                "value": null
            },
            "fechaFactura": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "numeroFactura": {
                "required": true,
                "type": "number",
                "value": null
            },
            "parEstadoFactura": {
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
            },
            "parTipoDocumentoMercantil": {
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
            },
            "cpcPagoContrato": {
                "type": "object",
                "fields": {
                    "idPagoContrato": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "cpcContrato": {
                        "type": "object",
                        "fields": {
                            "idContrato": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "cppProveedorCliente": {
                                "type": "object",
                                "fields": {
                                    "idProveedorCliente": {
                                        "required": true,
                                        "type": "number",
                                        "value": null
                                    },
                                    "parTipoProveedorCliente": {
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
                                    },
                                    "razonSocial": {
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
                                    "parEstado": {
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
                                    },
                                    "parTipoRegistro": {
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
                                    },
                                    "parTipoDocumento": {
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
                                    },
                                    "numeroDocumento": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "sigla": {
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
                                    "numeroFax": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "numeroCelular": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "correoElectronico": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "direccionWeb": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "logo": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "fechaAniversario": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "nit": {
                                        "required": true,
                                        "type": "number",
                                        "value": null
                                    }
                                }
                            },
                            "cpcSucursal": {
                                "type": "object",
                                "fields": {
                                    "idSucursal": {
                                        "required": true,
                                        "type": "number",
                                        "value": null
                                    },
                                    "numeroSucursal": {
                                        "required": true,
                                        "type": "number",
                                        "value": null
                                    },
                                    "codigo": {
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
                                    "descripcion": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "emiteFactura": {
                                        "required": true,
                                        "type": "boolean",
                                        "value": false
                                    },
                                    "nombreLocalizacion": {
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
                                                "value": ""
                                            },
                                            "descripcion": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "parDepartamento": {
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
                                    },
                                    "parMunicipio": {
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
                                            },
                                            "grupo": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "parLocalizacion": {
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
                                }
                            },
                            "nroContrato": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "fechaContrato": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "fechaVigenciaInicio": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "fechaVigenciaFin": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "nroCuotas": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "montoPrimeraMoneda": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "montoSegundaMoneda": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "tipoCambio": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "nroContratoCliente": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "cuentaBancaria": {
                                "type": "object",
                                "fields": {
                                    "idCuentaBancaria": {
                                        "required": true,
                                        "type": "number",
                                        "value": null
                                    },
                                    "parBanco": {
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
                                            },
                                            "nit": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            }
                                        }
                                    },
                                    "numeroCuenta": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "parTipoMoneda": {
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
                                    },
                                    "propietarioCuenta": {
                                        "required": true,
                                        "type": "string",
                                        "value": ""
                                    },
                                    "cppProveedorCliente": {
                                        "type": "object",
                                        "fields": {
                                            "idProveedorCliente": {
                                                "required": true,
                                                "type": "number",
                                                "value": null
                                            },
                                            "parTipoProveedorCliente": {
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
                                            },
                                            "razonSocial": {
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
                                            "parEstado": {
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
                                            },
                                            "parTipoRegistro": {
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
                                            },
                                            "parTipoDocumento": {
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
                                            },
                                            "numeroDocumento": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "sigla": {
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
                                            "numeroFax": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "numeroCelular": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "correoElectronico": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "direccionWeb": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "logo": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "fechaAniversario": {
                                                "required": true,
                                                "type": "string",
                                                "value": ""
                                            },
                                            "nit": {
                                                "required": true,
                                                "type": "number",
                                                "value": null
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "nroPago": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "descripcionPago": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "montoProgramado": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "montoProgramadoSegMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "fechaProgramada": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "montoFacturado": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "montoFacturadoSegMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "porcentajeProgramado": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "porcentajeFacturado": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "montoPagadoPrimeraMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "montoPagadoSegundaMoneda": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "parEstadoPago": {
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
                }
            },
            "codigoControl": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "incoterm": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "puertoDestino": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "valorBruto": {
                "required": true,
                "type": "number",
                "value": null
            },
            "gastosTransporte": {
                "required": true,
                "type": "number",
                "value": null
            },
            "gastosSeguro": {
                "required": true,
                "type": "number",
                "value": null
            },
            "totalFob": {
                "required": true,
                "type": "number",
                "value": null
            },
            "transporteInternacional": {
                "required": true,
                "type": "number",
                "value": null
            },
            "seguroInternacional": {
                "required": true,
                "type": "number",
                "value": null
            },
            "otrosGastos": {
                "required": true,
                "type": "number",
                "value": null
            },
            "idCbteContable": {
                "required": true,
                "type": "number",
                "value": null
            },
            "tipoCambioFactura": {
                "required": true,
                "type": "number",
                "value": null
            },
            "totalDescuentoPrimeraMoneda": {
                "required": true,
                "type": "number",
                "value": null
            },
            "totalDescuentoSegundaMoneda": {
                "required": true,
                "type": "number",
                "value": null
            },
            "parModalidadTransaccion": {
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
            },
            "parTipoTransaccion": {
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
            },
            "glosa": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "concepto": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "icePrimeraMoneda": {
                "required": true,
                "type": "number",
                "value": null
            },
            "iceSegundaMoneda": {
                "required": true,
                "type": "number",
                "value": null
            },
            "parEstadoPago": {
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
            },
            "nroFacturaInterno": {
                "required": true,
                "type": "string",
                "value": ""
            },
            "cuentaBancaria": {
                "type": "object",
                "fields": {
                    "idCuentaBancaria": {
                        "required": true,
                        "type": "number",
                        "value": null
                    },
                    "parBanco": {
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
                            },
                            "nit": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            }
                        }
                    },
                    "numeroCuenta": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "parTipoMoneda": {
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
                    },
                    "propietarioCuenta": {
                        "required": true,
                        "type": "string",
                        "value": ""
                    },
                    "cppProveedorCliente": {
                        "type": "object",
                        "fields": {
                            "idProveedorCliente": {
                                "required": true,
                                "type": "number",
                                "value": null
                            },
                            "parTipoProveedorCliente": {
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
                            },
                            "razonSocial": {
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
                            "parEstado": {
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
                            },
                            "parTipoRegistro": {
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
                            },
                            "parTipoDocumento": {
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
                            },
                            "numeroDocumento": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "sigla": {
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
                            "numeroFax": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "numeroCelular": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "correoElectronico": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "direccionWeb": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "logo": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "fechaAniversario": {
                                "required": true,
                                "type": "string",
                                "value": ""
                            },
                            "nit": {
                                "required": true,
                                "type": "number",
                                "value": null
                            }
                        }
                    }
                }
            }
        };
    };

    facturaEmitidaModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    facturaEmitidaModel.prototype.setObject = function (facturaEmitida) {
        Model.set(this.attrs, facturaEmitida, 'value');
    };

    facturaEmitidaModel.prototype.validate = function (facturaEmitida) {
        var self = this;
        self.setObject(facturaEmitida);
        return Model.validate(self.attrs);
    };

    return facturaEmitidaModel;
});