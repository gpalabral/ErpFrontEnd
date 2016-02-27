'use strict';

app.factory('empresaModel', function (Model) {
  var empresaModel = function () {
    this.attrs = {
      "idEmpresa": {
        "required": false,
        "type": "number",
        "value": null
      },
      "razonSocial": {
        "required": true,
        "id":"razonSocial",
        "type": "string",
        "value": ""
      },
      "nit": {
        "required": true,
        "type": "number",
        "id":"nit",
        "value": ""
      },
      "direccion": {
        "required": true,
        "type": "string",
        "id":"direccion",
        "value": ""
      },
      "ciudad": {
        "required": true,
        "type": "string",
        "id":"ciudad",
        "value": ""
      },
      "logo": {
        "required": false,
        "type": "string",
        "value": ""
      },
      "parTipoMonedaPrimero": {
        "type": "object",
        "fields": {
          "codigo": {
            "required": true,
            "type": "string",
            "value": "",
            "id":"parTipoMonedaPrimeroCodigo"
          },
          "descripcion": {
            "required": true,
            "type": "string",
            "value": ""
          }
        }
      },
      "parTipoMonedaSegundo": {
        "type": "object",
        "fields": {
          "codigo": {
            "required": true,
            "type": "string",
            "value": "",
            "id":"parTipoMonedaSegundoCodigo"
          },
          "descripcion": {
            "required": true,
            "type": "string",
            "value": ""
          }
        }
      },
      "periodoInicial": {
        "required": true,
        "type": "string",
        "value": "",
        "id":"periodoInicial"
      },
      "periodoFinal": {
        "required": true,
        "type": "string",
        "value": "",
        "id":"periodoFinal"
      },
      "gestionInicial": {
        "required": true,
        "type": "number",
        "value": null,
        "id":"gestionInicial"
      },
      "gestionFinal": {
        "required": true,
        "type": "number",
        "value": null,
        "id":"gestionFinal"
      }
    };
  };

  empresaModel.prototype.getObject = function () {
    return Model.get(this.attrs, 'value');
  };

  empresaModel.prototype.setObject = function (empresa) {
    Model.set(this.attrs, empresa, 'value');
  };

  empresaModel.prototype.validate = function (empresa) {
    var self = this;
    self.setObject(empresa);
    return Model.validate(self.attrs);
  };

  return empresaModel;
});


