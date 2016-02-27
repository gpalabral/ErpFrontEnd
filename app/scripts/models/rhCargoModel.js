'use strict';

app.factory('rhCargoModel', function (Model) {
    var rhCargoModel = function () {
        this.attrs = {
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
                        "value": undefined
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
            "rhSeccion": {
                "type": "object",
                "fields": {
                    "idSeccion": {
                        "required": true,
                        "type": "number",
                        "value": undefined
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
        };
    };

    rhCargoModel.prototype.getObject = function () {
        return Model.get(this.attrs, 'value');
    };

    rhCargoModel.prototype.setObject = function (rhCargo) {
        Model.set(this.attrs, rhCargo, 'value');
    };

    rhCargoModel.prototype.validate = function (rhCargo) {
        var self = this;
        self.setObject(rhCargo);
        return Model.validate(self.attrs);
    };

    return rhCargoModel;
});