'use strict';

app.controller('listaSenapiCtrl', function ($rootScope, $scope, $state, $http, serverConf, cxpService) {
    var listaSenapi;
    var init = function () {
    };

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 250, 500, 1000],
        pageSize: 10,
        currentPage: 1
    };
    $scope.setPagingData = function (data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        console.info("ENTRO AL METODO");
        setTimeout(function () {
            var data;
            cxpService.getListaSenapiAll({}, {}, serverConf.ERPCONTA_WS, function (response) {
                listaSenapi = response.data;
                console.log("LISTA SENAPI:", listaSenapi);
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    data = listaSenapi.filter(function (item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data, page, pageSize);
                } else {
                    $scope.setPagingData(listaSenapi, page, pageSize);
                }


            }, function () {
                console.info("ERROR...");
            })


            // if (searchText) {
            // 	var ft = searchText.toLowerCase();
            // 	$http.get('data/largeLoad.json').success(function (largeLoad) {
            // 		data = largeLoad.filter(function(item) {
            // 			return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
            // 		});
            // 		$scope.setPagingData(data,page,pageSize);
            // 	});
            //
            // } else {
            // 	$http.get('data/largeLoad.json').success(function (largeLoad) {
            // 		$scope.setPagingData(largeLoad,page,pageSize);
            // 	});
            // }
        }, 100);
    };

    

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [{field:'tramite.tramite', displayName:'Tramite'},
            {field:'tramite.tramite', displayName:'Observacion'},
            {field:'marca',displayName:'Marca'},
            {field:'fechaUltimaModificacion',displayName:'Fecha Ultima Modificacion',cellFilter: 'date:\'dd/MM/yyyy\''},
            {field:'tipoSolicitudSigno',displayName:'Tipo Solicitud Signo'}]
    };
    
    $scope.cargaListaSenapi=function (){
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);    
    }

    init();

});
