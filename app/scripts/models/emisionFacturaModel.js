'use strict';

app.factory('emisionFacturaModel', function (Model) {
  var emisionFacturaModel = function () {
    this.attrs = {
      "cpcFacturaEmitida": {
        "type": "object",
        "fields": {
          "cpcPagoContrato": {
            "type":'object',
            "required": false,
            "value":null,
            "fields":{}
          },
          "cppProveedorCliente": {
            "type": "object",
            "fields": {
              "nombre": {
                "required": false,
                "type": "string",
                "value": ""
              },
              "razonSocial": {
                "required": false,
                "type": "string",
                "value": ""
              },
              "nit": {
                "required": true,
                "type": "number",
                "id":"nitcliente",
                "value": null
              },
              "logo": {
                "required": false,
                "type": "string",
                "value": ""
              },
              "parTipoRegistro": {
                "type": "object",
                "fields": {
                  "codigo": {
                    "required": false,
                    "type": "string",
                    "value": ""
                  },
                  "descripcion": {
                    "required": false,
                    "type": "string",
                    "value": ""
                  }
                }
              },
              "idProveedorCliente": {
                "required": true,
                "type": "number",
                "id":"idProveedorCliente",
                biggerThan: 0,
                "value": null
              }
            }
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
          "numeroFactura": {
            "required": true,
            "type": "number",
            "value": null
          },
          "codigoControl": {
            "required": false,
            "type": "string",
            "value": ""
          },
          "fechaFactura": {
            "required": true,
            "type": "string",
            "value": ""
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
                "required": false,
                "type": "string",
                "value": ""
              }
            }
          },
          "transporteInternacional": {
            "required": true,
            "type": "number",
            "value": null
          },
          "gastosTransporte": {
            "required": false,
            "type": "number",
            "value": null
          },
          "seguroInternacional": {
            "required": false,
            "type": "number",
            "value": null
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
                "required": false,
                "type": "string",
                "value": ""
              }
            }
          },
          "tipoCambioFactura": {
            "required": true,
            "type": "number",
            "id": "tipoCambio",
            "value": null
          },
          "incoterm": {
            "required": false,
            "type": "string",
            "value": ""
          },
          "puertoDestino": {
            "required": false,
            "type": "string",
            "value": ""
          },
          "valorBruto": {
            "required": false,
            "type": "number",
            "value": null
          },
          "gastosSeguro": {
            "required": false,
            "type": "number",
            "value": null
          },
          "totalFob": {
            "required": false,
            "type": "number",
            "value": null
          },
          "otrosGastos": {
            "required": false,
            "type": "number",
            "value": null
          },
            "icePrimeraMoneda": {
                "required": false,
                "type": "number",
                "value": 0
            },
            "iceSegundaMoneda": {
                "required": false,
                "type": "number",
                "value": 0
            },
            "parTipoDocumentoMercantil": {
                "type": "object",
                "fields": {
                    "codigo": {
                        "required": true,
                        "type": "string",
                        "value": "FACT"
                    },
                    "descripcion": {
                        "required": false,
                        "type": "string",
                        "value": ""
                    }
                }
            },
            "cuentaBancaria": {
               "type": "object",
               "fields": {
                "idCuentaBancaria": {
                    "required": true,
                    "type": "number",
                    "id":"idCuentaBancaria",
                    "value": null
                }
               }
            }
        }
      },
      "listaCpcDetalleFactura": {
        "required": true,
        "type": "array",
        "subType": "object",
        "minLength": 1,
        "fields": {
          "cpcItem": {
            "type": "object",
            "fields": {
              "codigo": {
                "required": false,
                "type": "string",
                "value": ""
              },
              "descripcion": {
                "required": false,
                "type": "string",
                "value": ""
              },
              "idItem": {
                "required": false,
                "type": "number",
                "value": null
              },
              "precioUnitarioPrimeraMoneda": {
                "required": false,
                "type": "number",
                "value": null
              },
              "precioUnitarioSegundaMoneda": {
                "required": true,
                "type": "number",
                "value": null
              },
              "idCtaIngreso": {
                "required": true,
                "type": "number",
                "value": null
              },
              "montoFijo": {
                "required": true,
                "type": "boolean",
                "value": false
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
          "subtotalPrimeraMoneda": {
            "required": true,
            "type": "number",
            "value": null
          },
          "subtotalSegundaMoneda": {
            "required": true,
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
            "value": null,
            biggerThan: 0
          },
          "unidadMedida": {
            "required": false,
            "type": "string",
            "value": ""
          }
        }
      }
    };
  };

  emisionFacturaModel.prototype = {
    getObject : function () {
      return Model.get( this.attrs, 'value' );
    },
    setObject : function ( factura ) {
      Model.set( this.attrs, factura, 'value' );
    },
    validate : function ( factura ) {
      var self = this;
      self.setObject(factura);
      return Model.validate(self.attrs);
    }
  };

  return emisionFacturaModel;
});
