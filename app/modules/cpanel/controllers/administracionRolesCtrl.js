/**
 * Created by paola on 11-05-15.
 */

app.controller('administracionRolesCtrl', function ($scope, $state, cpanelService, serverConf, $http, $modal,
                                                localStorageService,MODULES,$rootScope,menuModulo,tempCache) {

    /****************Definción de variables********************/
    $scope.idUsuarioSel=tempCache.idUsuario;
    $scope.rolesAsignados=[];
    var left=[];
    $scope.mySelections=[];
    $scope.myRemoves=[];
    $scope.moduloSel="";
    $scope.idModulo="";
    $scope.usuarioRol={
        "admUsuario": {
            "admPersona": {
                "nombre": "",
                "apPaterno": "",
                "apMaterno": "",
                "idPersona": 0,
                "nroDocumento": "",
                "parTipoDocumento": {
                    "codigo": "",
                    "descripcion": ""
                },
                "nombreCompleto": ""
            },
            "idUsuario": 0,
            "contrasena": "",
            "login": "",
            "parEstadoUsuario": {
                "codigo": "",
                "descripcion": ""
            },
            "correoElectronico": "",
            "fechaExpiracion": ""
        },
        "admRol": {
            "idRol": 0,
            "cargo": ""
        },
        "idUsuarioRol": 0
    };

    var obtieneListados=function (idUsuario,idModulo){

        console.log(idUsuario,idModulo);

        cpanelService.getRolesNoAsignadosPorUsuarioModulo({},{},idUsuario,idModulo, serverConf.TEST_SERVER, function (response) {
            //exito
            $scope.rolesNOAsignados = response.data;
            console.info("administracionRoles:roles NO asignados",$scope.rolesNOAsignados);
        }, function (responseError) {
            //error
            console.log(responseError);
        });

          cpanelService.getRolesAsignadosPorUsuarioModulo({},{},idUsuario,idModulo, serverConf.TEST_SERVER, function (response) {
         //exito
         $scope.rolesAsignados = response.data;
         console.log("administracionRoles:rolesAsignados",$scope.rolesAsignados);
         }, function (responseError) {
         //error
         console.log(responseError);
         });
    };

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene Datos del usuario por su id*/
    cpanelService.getUsuarioById({},{},$scope.idUsuarioSel,serverConf.TEST_SERVER, function (response) {
        //exito
        console.info("administracionRoles: Datos Usuario",response.data);
        $scope.datosUsuario = response.data;
    }, function (responseError) {
        console.log(responseError);
        //error
    });

    /*Creado por: Paola Mejia
     *Descripcion: Obtiene listado de moodulos por idUsuario*/
    cpanelService.getListaModulosPorUsuario({},{},$scope.idUsuarioSel,serverConf.TEST_SERVER, function (response) {
        //exito
        console.info("administracionRoles: lista modulos",response.data);
        $scope.listaModulos = response.data;
    }, function (responseError) {
        console.log(responseError);
        //error
    });

    $scope.filtrarModulo=function(itemModulo){
        console.log("DATOS MODULO SEL",itemModulo);
        obtieneListados($scope.idUsuarioSel,parseInt(itemModulo));

    };


    /*Creado por: Paola Mejia
     *Obtiene los Roles*/
    var init=function () {
        //var cellTemplate = "<div ng-class='{negrita:item._nodeLevel === 0}'>{{item.descripcion}}</div>";
        $scope.btnVerPermisos = '<button id="verPermisos" type="button" height="5" class="btn btn-default" ng-click="verPermisos(row)" style="cursor: pointer;" data-placement="bottom" title="Ver Permisos">' +
        '<span class="glyphicon glyphicon-circle-arrow-down"></span></button>';

        $scope.gridRolesNOAsignados = {
            data: 'rolesNOAsignados',
            enableRowSelection: true,
            enableCellSelection:false,
            multiSelect:false,
            selectedItems: $scope.mySelections,
            enableSorting:true,
            columnDefs: [
                {
                    field: 'cargo',
                    displayName: "Roles",
                    width: '85%',
                    headerClass: "header-center",
                    cellClass: "text-left",
                    sortable: true
                },
                { displayName:"",
                  cellTemplate: $scope.btnVerPermisos,
                  width: '15%',
                  enableCellEdit: false }
            ]
        };
        $scope.gridRolesNOAsignados.selectRow= function(rowIndex, state){
            console.log("DATOS DE SELECTROW",rowIndex);
        };
        $scope.gridRolesAsignados = {
            data: 'rolesAsignados',
            enableRowSelection: true,
            enableCellSelection:false,
            multiSelect:false,
            selectedItems: $scope.myRemoves,
            enableSorting:true,
            columnDefs: [
                {
                    field: 'cargo',
                    displayName: "Roles Asignados",
                    width: '100%',
                    headerClass: "header-center",
                    cellClass: "text-left",
                    sortable: true
                }]
        };
        $scope.hideLoader();

        var obtienePermisos=function(idRol){
            /*Creado por: Paola Mejia
             *Descripcion: Obtiene los permisos por idRol*/
            cpanelService.getPermisosPorIdRol({},{},idRol,serverConf.TEST_SERVER, function (response) {
                //exito
                console.info("administracionRoles: permisos",response.data);
                $scope.listaPermisos = response.data;
            }, function (responseError) {
                console.log(responseError);
                //error
            });
        }







        $scope.verPermisos=function(row){
            console.log("DATOS SELECCIONADOS FILA",row);
            /*Creado por: Paola Mejia
             *Descripcion: Obtiene los permisos por idRol*/
            cpanelService.getPermisosPorIdRol({},{},row.entity.idRol,serverConf.TEST_SERVER, function (response) {
                //exito
                console.info("administracionRoles: permisos",response.data);
                $scope.listaPermisos = response.data;
            }, function (responseError) {
                console.log(responseError);
                //error
            });
        };
    };



    /*Creado por: Paola Mejia
     * Adiciona al listado derecho los roles seleccionados*/
    $scope.moveRight = function() {
        console.log("SELECCIONADOS",$scope.mySelections);
        //console.log($scope.concepto.cppGrupo.idGrupo);
        left = $scope.mySelections;
        for(var i=0;i<left.length;i++)
        {
            if ($scope.rolesAsignados.indexOf(left[i]) < 0) {
                $scope.rolesAsignados.push(left[i]);

                $scope.indice=$scope.rolesNOAsignados.indexOf(left[i]);

                if ($scope.indice > -1) {
                    $scope.rolesNOAsignados.splice($scope.indice, 1);
                }
            }
        }

    };

    $scope.moveLeft = function() {
        console.log("DATOS PARA REMOVER-->",$scope.myRemoves);
        var toMove = $scope.myRemoves;

        for(var i=0;i<toMove.length;i++)
        {
            $scope.rolesNOAsignados.push(toMove[i]);
            $scope.indice = $scope.rolesAsignados.indexOf(toMove[i]);
            $scope.rolesAsignados.splice($scope.indice, 1);

        }

    };

    $scope.guardarPago=function(){
        cpanelService.adicionaPagoBancarizado( $scope.documentoPago, {},serverConf.ERPCONTA_WS,function (response) {
            //exito
            console.info("pagoBancarizado:grabado Pago--->>>>",response.data);
        }, function (responseError) {
            //error
        });
    };
    $scope.cancelarRol= function(){
        $state.go('usuarios');
    };
    init();
    obtieneListados($scope.idUsuarioSel,$scope.idModulo);
});
