'use strict';

app.controller('conceptoListaCtrl', function  ($scope,tempCache,cxpService,serverConf,$state,$filter,$stateParams) {
	$scope.groupInfo = tempCache.grupoInfo;
	console.log("conceptoListaCtrl");
	var init = function () {
		cxpService.getListaDeConceptos({}, {}, serverConf.ERPCONTA_WS, function (response) {
			var listaDeConceptos = response.data;
			$scope.conceptos = $filter('filter')(listaDeConceptos, function (concepto) {
				if(concepto.cppGrupo.idGrupo == $stateParams.idGrupo){
					return concepto;
				}
			});
		}, function () {

		})
	};
	//idGrupo
	$scope.addConcepto = function(){
		$state.go( 'grupos.conceptoAlta', {idGrupo : $stateParams.idGrupo} );
	};

	init();
});
