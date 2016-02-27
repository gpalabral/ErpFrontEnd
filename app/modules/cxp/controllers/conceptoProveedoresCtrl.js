/**
 * Created by paola on 11-03-15.
 */
'use strict';

app.controller('conceptoProveedoresCtrl', function  ($scope,$rootScope,tempCache,cxpService,serverConf,$modalInstance, modalOptions,$state) {

    /*Creado por: Paola Mejia
      */
    var obtieneProveedoresPorConcepto= function(){

        cxpService.getProveedoresByConcepto({}, {idConcepto: "1"}, serverConf.ERPCONTA_WS, function (respuesta) {
            //exito
            console.info("Listado de Proveedores por concepto EXITOSO!!!");
            $scope.proveedoresByConcepto = respuesta.data;
        }, function (responseError) {
            //error
        });
    };

    $scope. getProveedorSeleccionado=function(){
        console.log($scope.proveedorSeleccionado);
    };
    $scope.cancelar=function(){
        $modalInstance.dismiss('cancel');
    };
    $scope.seleccionar=function(){
        //$modalInstance.close($scope.conceptoSeleccionado);
    };

    obtieneProveedoresPorConcepto();
    $scope.ngNombreGrupo=modalOptions.valorGrupo;
});
