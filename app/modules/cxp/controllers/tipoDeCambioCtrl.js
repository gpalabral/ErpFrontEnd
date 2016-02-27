'use strict';

app.controller('tipoDeCambioCtrl', function  ($scope,$rootScope,tempCache,cxpService,serverConf,$modalInstance,$state,localStorageService) {

	$scope.fecha=null;
	$scope.tipoCambio={
		"fechaModificacion": null,
		"usuarioModificacion": null,
		"fecha": new Date,
		"usuarioAlta": "SISTEMA",
		"usuarioBaja": null,
		"fechaBaja": null,
		"idTipoCambio": 128,
		"fechaAlta": 1425567818567,
		"tipoCambio": 6.96,
		"tipoUfv": 0
	};



	$scope.guardaCaheTipoCambioDesdeContabilidad=function(){
		console.info($scope.tipoCambio);
		localStorageService.set('tipoCambioObjeto',$scope.tipoCambio);
		console.log(localStorageService.get('tipoCambioObjeto'));
		$modalInstance.dismiss('cancel');

	};

	$scope.cancelarDialogoTipoCambio=function(){
		tempCache.tipoCambioContabilidad=$scope.tipoCambio=[];
		$modalInstance.dismiss('cancel');
		$state.go('menuBap');
	};

    $scope.obtenerFecha= function () {
      $scope.fechaSeleccionada=new Date($scope.tipoCambio.fecha);
      var nuevaFecha=convertirFecha( $scope.fechaSeleccionada);

      console.log("===>",nuevaFecha);
      cxpService.getTipoCambioByFecha({}, {fecha: nuevaFecha}, serverConf.ERPCONTA_WS, function (response) {
            //exito
            console.info("Tipo de Cambio exitoso!!!!");
            $scope.restipoCambio = response.data;
          console.log($scope.restipoCambio);
            $scope.tipoCambio.tipoCambio= $scope.restipoCambio.tipoCambio;
        }, function (responseError) {
            //error
        });

    };

    function convertirFecha( fechaOrigen) {

        var fechadias;
        var anio = fechaOrigen.getFullYear();
        var mes = fechaOrigen.getMonth() + 1;
        var dia = fechaOrigen.getDate();

        if (mes.toString().length < 2) {
            mes = "0".concat(mes);
        }

        if (dia.toString().length < 2) {
            dia = "0".concat(dia);
        }
        fechadias = dia + "/" + mes + "/" + anio;

       return fechadias;
    };



});