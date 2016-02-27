'use strict';

app.controller('grupoDetalleCtrl', function  ($scope, tempCache, cxpService, serverConf) {
	$scope.grupo = tempCache.grupoInfo;
    console.log("Datos grupo-->",$scope.grupo);
	$scope.readOnlyEnable = true;
	function init(){
		// obteniendo los datos para par recurrencia
		cxpService.getListParRecurrencia({},{},serverConf.ERPCONTA_WS, function(response) {
			$scope.parRecurrenciaOptions = response.data;
		});
	}

	function ngGridConfig () {
		$scope.tableData = [
			{ label : 'Cuentas por Pagar', numCuenta:'',descripcionCuenta:'', code:'cxp'},
			{ label : 'Documentos por Pagar', numCuenta:'',descripcionCuenta:'', code:'dxp'},
			{ label : 'Anticipos sobre Cuentas', numCuenta:'',descripcionCuenta:'',code:'asc'}
		];

		$scope.gridConf = {
			data : 'tableData',
			enableRowSelection : false,
			columnDefs : [
				{ field: 'label', width: '25%',displayName:'Cuentas Exigibles', headerClass: "header-center"},
				{ field: 'numCuenta',width: '20%',displayName:'Número de Cuenta',  headerClass: "header-center" },
				{ field: 'descripcionCuenta', displayName:'Descripción',  headerClass: "header-center" }
			]
		};
	}

	ngGridConfig();
	init();
});
