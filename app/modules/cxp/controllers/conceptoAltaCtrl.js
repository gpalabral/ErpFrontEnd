'use strict';

app.controller('conceptoAltaCtrl', function ($scope, $state, serverConf, cxpService, $stateParams, $http,
                                             contabilidadService, conceptoModel, $filter, modalService) {
	var concepto = new conceptoModel();
	$scope.concepto = concepto.getObject();
    $scope.proveedores=[];

    $scope.concepto.cppGrupo ={
		idGrupo : $stateParams.idGrupo
	};

	$scope.conceptoData = {
		nroCuenta : '',
		descripcionCuenta : ''
	};

	function init(){

		$http.get('data/contabilidadJson.json').success(function (response) {
			$scope.contaTree = {
				children : createTree(response)
			};
		});

		cxpService.getListParTipoDocumentoMercantil({},{},serverConf.ERPCONTA_WS, function (response) {
			$scope.listParTipoDocumentoMercantil = response.data;
		});
		cxpService.getListParPeriodo({},{},serverConf.ERPCONTA_WS, function (response) {
			$scope.listParPeriodo = response.data;
		});
		cxpService.getListParTipoMoneda({},{},serverConf.ERPCONTA_WS, function (response) {
			$scope.listParTipoMoneda = response.data;
		});
		cxpService.getListParTipoRetencion({},{},serverConf.ERPCONTA_WS, function (response) {
			$scope.listParTipoRetencion = response.data;
		});
	}

	$scope.guardarConcepto = function () {
		if ( concepto.validate ( $scope.concepto ) ) {
			cxpService.adicionarConcepto($scope.concepto,{},serverConf.ERPCONTA_WS,function () {
				$state.go('grupos.detalle',{idGrupo:$stateParams.idGrupo});
			}, function (error) {
				console.log("error");
				console.log(error);
			});
		} else {
			// by error
		}
	};

	$scope.abrirModal = function () {
		var modalDefaults = {
			controller : 'modal1'
		};

		var modalOptions = {
			headerText: 'Plan de cuentas',
			tree : $scope.contaTree
		};

		$scope.abrirTreeModal(modalDefaults,modalOptions,function (respuesta) {
			$scope.concepto.idCntEntidad = respuesta.idEntidad;
			$scope.conceptoData = {
				nroCuenta : respuesta.mascaraGenerada,
				descripcionCuenta : respuesta.descripcion
			};
		});
	};

	$scope.volver = function () {
		$state.go('grupos.detalle',{idGrupo:$stateParams.idGrupo});
	};

	init();



    /*Creado por: Paola Mejia
    * Obtiene el listado de proveedores*/
    cxpService.getProveedores({}, {tipoRegistro: "PROV"}, serverConf.ERPCONTA_WS, function (response) {
        //exito
        console.info("Listado de Proveedores exitoso");
        $scope.proveedores = response.data;
        console.log($scope.proveedores );
    }, function (responseError) {
        //error
    });

    $scope.rightSelect = [];
    $scope.toRemove = [];
    var left=[];
    /*Creado por: Paola Mejia
     * Adiciona al listado derecho lo proveedores seleccionados*/
    $scope.moveRight = function() {
        console.log("SELECCIONADO-",$scope.leftSelect);
        console.log($scope.concepto.cppGrupo.idGrupo);
        console.log($stateParams.idGrupo);
        left = $scope.leftSelect;
        for (var i = 0; i < left.length; i++) {
            var el = left[i];
            if ($scope.rightSelect.indexOf(el) < 0) {
                $scope.rightSelect.push(left[i]);

                $scope.indice=$scope.proveedores.indexOf(el);

                if ($scope.indice > -1) {
                    $scope.proveedores.splice($scope.indice, 1);
                }
            }
        }
    };

    $scope.moveLeft = function() {
        var toRemove = $scope.toRemove;
        for (var i = 0; i < toRemove.length; i++) {
            var el = toRemove[i];
            //$scope.proveedores[$scope.proveedores.length+1]=el;
            console.log(el);
            $scope.proveedores.push(el);

            var indexOf = $scope.rightSelect.indexOf(el);
            $scope.rightSelect.splice(indexOf, 1);
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
});
