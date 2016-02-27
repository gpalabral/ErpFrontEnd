'use strict';

app.controller('paginaInicialCuentasPagarCtrl', function  ($scope,$modal) {


	$scope.showModalTipoCambioBAP = function () {
		console.info("ENTROO METODO TIPO CAMBIO");
		var modalPlanPagos = $modal.open({
			templateUrl: 'modules/cxp/views/tipoCambio.html',
			controller:'tipoDeCambioCtrl',
            backdrop: 'static'
		});
	};

	var init = function () {
	    $scope.showModalTipoCambioBAP();
	};

	init();


});