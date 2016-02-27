/**
 * Created by paola on 12-02-15.
 */

'use strict';


app.controller('planPagosCtrl', function ($scope, cxpService, serverConf,$modalInstance) {

    var montoBs = 1085;
    var fecha = new Date();
    var tipoCambio = 6.97;
    $scope.myData = [];
    $scope.planPagosLista = [];
    $scope.numeroDePagos = 0;
    $scope.cantDias = 0;
    var montoParcialBs, montoParcialSus = 0;
    $scope.mostrarGrilla = false;

    $scope.planPagos = {
        "cppFactura": {
            "cppProveedorCliente": {
                "nombre": "",
                "razonSocial": "",
                "sigla": "",
                "direccion": "",
                "telefonoUno": "",
                "telefonoDos": "",
                "numeroFax": "",
                "numeroCelular": "",
                "direccionWeb": "",
                "logo": "",
                "parEstado": {
                    "codigo": "VIG",
                    "descripcion": ""
                },
                "correoElectronico": "",
                "fechaAniversario": "",
                "idProveedorCliente": 1,
                "primerApellido": "",
                "segundoApellido": "",
                "numeroDocumento": "",
                "parTipoProveedorCliente": {
                    "codigo": "NAT",
                    "descripcion": ""
                },
                "parTipoRegistro": {
                    "codigo": "CLI",
                    "descripcion": ""
                },
                "parTipoDocumento": {
                    "codigo": "CI",
                    "descripcion": ""
                },
                "fechaAlta": "",
                "usuarioAlta": "",
                "fechaBaja": "",
                "usuarioBaja": "",
                "fechaModificacion": "",
                "usuarioModificacion": ""
            },
            "idFactura": 1,
            "numeroFactura": 0,
            "numeroPagos": 0,
            "diasPagos": 0,
            "parTipoPago": {
                "codigo": "IGU",
                "descripcion": ""
            },
            "idCntComprobante": 0,
            "fechaAlta": "",
            "usuarioAlta": "",
            "fechaBaja": "",
            "usuarioBaja": "",
            "fechaModificacion": "",
            "usuarioModificacion": ""
        },
        "idPlanPago": "",
        "fecha": "",
        "montoPrimeraMoneda": 1000,
        "montoSegundaMoneda": 200,
        "fechaAlta": "",
        "usuarioAlta": "",
        "fechaBaja": "",
        "usuarioBaja": "",
        "fechaModificacion": "",
        "usuarioModificacion": ""
    };
    $scope.guardarPlanPagos = function () {
        cxpService.adicionarPlanPagos($scope.planPagos, {}, serverConf.ERPCONTA_WS, function (respuesta) {
                //EXITO
                console.info("ALMACENO CORRECTAMENTE");
            }, function (respuestaDeError) {
            }
        );
    };

    function adicionaDiasFecha(infecha, dias) {

        var fechadias = "";
        var cadadias = parseInt(dias);
        //infecha=infecha.replace("-", "/");
        //infecha= new Date(infecha);
        infecha.setDate(infecha.getDate() + cadadias);

        var anio = infecha.getFullYear();
        var mes = infecha.getMonth() + 1;
        var dia = infecha.getDate();

        if (mes.toString().length < 2) {
            mes = "0".concat(mes);
        }

        if (dia.toString().length < 2) {
            dia = "0".concat(dia);
        }

        fechadias = dia + "/" + mes + "/" + anio;

        return fechadias;

    };


    $scope.genPlanPagos = function () {
        $scope.mostrarGrilla = true;
        montoParcialBs = (montoBs / $scope.numeroDePagos).toFixed(2);
        montoParcialSus = (montoParcialBs / tipoCambio).toFixed(2);
        var fechaMasDias = fecha;
        var nroPagos = parseInt($scope.numeroDePagos);

        $scope.limpiarGrilla();
        for (var i = 0; i < nroPagos; i++) {
            //$scope.myData.push({Fecha:adicionaDiasFecha(fechaMasDias,$scope.cantDias),Bolivianos:montoParcialBs,Dolares:montoParcialSus});

            console.info(adicionaDiasFecha(fechaMasDias, $scope.cantDias));
            $scope.planPagos.fecha = adicionaDiasFecha(fechaMasDias, $scope.cantDias);
            $scope.planPagos.montoPrimeraMoneda = montoParcialBs;
            $scope.planPagos.montoSegundaMoneda = montoParcialSus;

            $scope.planPagosLista.push($scope.planPagos);
            fechaMasDias = new Date(fechaMasDias);

            $scope.planPagos = [];
        }
    };

    $scope.gridOptions = {
        data: 'planPagosLista',
        columnDefs: [{field: "fecha", displayName: "Fecha"},
            {field: "montoPrimeraMoneda", displayName: "Bolivianos"},
            {field: "montoSegundaMoneda", displayName: "Dolares"}
        ]
    };
    //$scope.gridOptions={data:'myData'};

    $scope.limpiarGrilla = function () {
        //$scope.mostrarGrilla = false;
        //$scope.myData.splice(0,$scope.myData.length);
        $scope.planPagosLista.splice(0, $scope.planPagosLista.length);
    };

    $scope.cancelar=function(){
      $modalInstance.dismiss('cancel');
    };


});


