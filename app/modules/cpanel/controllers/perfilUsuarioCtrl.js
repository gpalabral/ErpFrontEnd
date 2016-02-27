/**
 * Created by paola on 11-05-15.
 */

app.controller('perfilUsuarioCtrl', function ($scope, localStorage, cxcService, serverConf, modalService, dosificacionModel, sucursalModel, cpanelService) {


    $scope.readOnlyEnable = true;
    var dosificacion = new dosificacionModel();
    $scope.cpcdosificaciones = dosificacion.getObject();

    var sucursal = new sucursalModel();
    $scope.cpcSucursal = sucursal.getObject();

    $scope.usuario = {
        username: "",
        password: ""
    };

    $scope.objetoPassword = {
        passwordNuevo: "",
        passwordNuevoRepite: ""
    };

    //var objetoTipoCambio = {}


    function init() {

        var perfilUsuario = localStorage.get('atributosPerfil');

        var usuario = localStorage.get('user');
        $scope.nombreUsuario = usuario.userName;
        console.info("NOMBRE USUARIO:", $scope.nombreUsuario);

        $scope.usuario.username = $scope.nombreUsuario;


        cxcService.getCpcSucursalByIdSucursal({}, {}, perfilUsuario.sucursalPredeterminada, serverConf.ERPCONTA_WS, function (response) {
            console.log(response);
            $scope.cpcSucursal = response.data || {};
        }, function (responseError) {
            //error
        });

    }

    //var objetoPassword= {
    //    passwordOriginal: $scope.cpccontrato.montoSegundaMoneda,
    //    nuevoPassword: $scope.cpccontrato.tipoCambio
    //};
    //
    //$scope.comparaCambioPassword=function(objetoPassword,passwordOriginal,nuevoPassword){
    //
    //};


    $scope.abrirModalDosificaciones = function (row) {
        var modalConceptos = modalService.show(
            {
                templateUrl: 'modules/cxc/views/modalBuscadorDosificacion.html',
                controller: 'modalBuscadorDosificacionCtrl',
                size: 'lg'
            }, {
                //idProveedor: $scope.itemSeleccionado.proveedorCliente.idEntidadPojo
            }
        ).then(function (respModal) {
                console.info("RESPUESTA", respModal);
                $scope.cpcdosificaciones = respModal;

            });
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.veririfcaNuevaPassword = function (objetoPassword, funcion) {
        if (objetoPassword.passwordNuevo == objetoPassword.passwordNuevoRepite) {
            funcion(true);
        } else {
            funcion(false);
        }
    };

    $scope.guardaCambiosPassword=function(){

        console.info("USUARIO:", $scope.usuario);
        console.info("PASS:", $scope.usuario.password);
        if ($scope.usuario.password != "") {
            cpanelService.verificaContrasenia($scope.usuario, {}, serverConf.TEST_SERVER, function (response) {
                console.log("RESPUESTA LOG:", response.data);

                $scope.veririfcaNuevaPassword($scope.objetoPassword, function (respuesta) {
                    if (respuesta) {
                        console.info("CORRECTO");
                    } else {
                        console.info("INCORRECTO");
                    }
                });

            }, function (responseError) {
                //error
                console.log("RESPUESTA LOG ERROR:", responseError);
            });
        }


    };

    $scope.guardaCambiosPerfilUsuario = function () {

        console.info("USUARIO:", $scope.usuario);
        console.info("PASS:", $scope.usuario.password);
        if ($scope.usuario.password != "") {
            cpanelService.verificaContrasenia($scope.usuario, {}, serverConf.TEST_SERVER, function (response) {
                console.log("RESPUESTA LOG:", response);

                $scope.veririfcaNuevaPassword($scope.objetoPassword, function (respuesta) {
                    if (respuesta) {
                        console.info("CORRECTO");
                    } else {
                        console.info("INCORRECTO");
                    }
                });

            }, function (responseError) {
                //error
                console.log("RESPUESTA LOG ERROR:", responseError);
            });
        }




    };


    init();

});
