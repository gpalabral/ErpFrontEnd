/**
 * Created by paola on 07-05-15.
 */
'use strict';

app.controller('usuariosCtrl', function ($scope, $state, cpanelService, serverConf,tempCache, modalService) {
    $scope.mostrar={
        formUsuario:false
    };

    $scope.operacion="";
    $scope.usuarioPersona={
        "admPersona": {
            "idPersona": 0,
            "nombre": "",
            "apPaterno": "",
            "apMaterno": "",
            "parTipoDocumento": {
                "codigo": "CI",
                "descripcion": ""
            },
            "nroDocumento": ""
        },
        "idUsuario": 0,
        "login": "",
        "contrasena": "",
        "correoElectronico": "",
        "fechaExpiracion": "",
        "parEstadoUsuario": {
            "codigo": "VIG",
            "descripcion": ""
        }
    };

    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el listado de documentos*/
    $scope.listaParTipoDocumento = function () {
        cpanelService.getListParTipoDocumento({}, {}, serverConf.TEST_SERVER, function (respuesta) {
            // EXITO
            $scope.listaTipoDocumento = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el listado de estado del usuario*/
    $scope.listaParEstadoUsuario = function () {
        cpanelService.getListParEstadoUsuario({}, {}, serverConf.TEST_SERVER, function (respuesta) {
            // EXITO
            $scope.listaEstadoUsuario = respuesta.data;
        }, function (respuestaDeError) {
            // ERROR\
        });
    };
    /*Creado por: Paola Mejia
     * Descripcion: Obtiene el listado de usuario-persona y concatena el nombre completo*/
    function actualizarUsuarios () {
        cpanelService.getUsuarioPersona({}, {}, serverConf.TEST_SERVER, function (respuesta) {
            // EXITO
            $scope.usuarios = respuesta.data;
            console.log("usuarios: lista",$scope.usuarios);
            $scope.usuarios.fechaExpiracion= new Date($scope.usuarios.fechaExpiracion);
        }, function (respuestaDeError) {
            // ERROR\
        });
    }
    var ngGridConfig= function () {
        actualizarUsuarios();
        $scope.btnAsignarRol = '<button id="asigRol" type="button" height="5" class="btn btn-primary" ng-click="asignarRol(row)" style="cursor: pointer;" data-placement="bottom" title="Asignar Rol">' +
        '<span class="glyphicon glyphicon-user"></span></button>';
        $scope.btnEditar = '<button id="editarUsuario" type="button" height="5" class="btn btn-primary" ng-click="editarUsuario(row)" style="cursor: pointer;" data-placement="bottom" title="Editar Usuario">' +
        '<span class="glyphicon glyphicon-pencil"></span></button>';
        $scope.btnEliminar = '<button id="eliminarUsuario" type="button" height="5" class="btn btn-primary" ng-click="eliminarUsuario(row)" style="cursor: pointer;" data-placement="bottom" title="Eliminar Usuario">' +
        '<span class="glyphicon glyphicon-trash"></span></button>';

        $scope.linkEliminarRol='<a href="#" >Eliminar</a>';
        $scope.gridOptions = {
            data :'usuarios',
            heightRow:32,
            enableRowSelection : false,
            columnDefs : [
                { field: 'login', width: '15%',displayName:'Login', headerClass: "header-center",cellClass:"text-left"},
                { field: 'admPersona.nombreCompleto',width: '29%',displayName:'Nombre Completo',  headerClass: "header-center", cellClass:"text-left" },
                { field: 'parEstadoUsuario.descripcion',width: '15%',displayName:'Estado',  headerClass: "header-center", cellClass:"text-left"  },
                { field: 'fechaExpiracion',width: '15%',displayName:'Fecha Expiración',  cellFilter: 'date:\'dd/MM/yyyy\'',headerClass: "header-center" , cellClass:"text-center" },
                { displayName:'Asignar Rol',cellTemplate: $scope.btnAsignarRol, width: '10%', enableCellEdit: false},
                { displayName:'Editar',cellTemplate: $scope.btnEditar, width: '7%', enableCellEdit: false},
                { displayName:'Eliminar',cellTemplate: $scope.btnEliminar, width: '9%', enableCellEdit: false}
            ]
        };

        $scope.asignarRol=function(row){
            console.log(row);
            tempCache.idUsuario=row.entity.idUsuario;
            if(tempCache.idUsuario)
              $state.go('administracionRoles');
        };
    };
    ngGridConfig ();
    $scope.listaParTipoDocumento();
    $scope.listaParEstadoUsuario();

    $scope.crearNuevoUsuario=function(){
        $scope.operacion="adicionar";
        $scope.mostrar.formUsuario=true;
    };

    $scope.eliminarUsuario = function (row) {
        $scope.index = this.row.rowIndex;
        console.log("datos a eliminar",row);
        $scope.idUsuarioEliminar=row.entity.idUsuario;
        var modalDefaults = {
            templateUrl: 'views/modalTemplates/verificarEliminacion.html',
            controller: 'modalDelete'
        };
        var modalOptions = {
            headerText: 'Panel de Control: Eliminacion',
            bodyText: 'Esta seguro de eliminar el registro?',
            actionButtonText: "Aceptar",
            cancelButtonText: "cancelar"
        };

        modalService.show(modalDefaults,modalOptions).then( function () {
            console.log('eliminar');
            $scope.gridOptions.selectItem( $scope.index , false);
            $scope.usuarios.splice( $scope.index , 1);

            /*Creado por: Paola Mejia
            * Descripcion: Elimina el registro seleccionado por idUsuario*/
            cpanelService.delUsuarioPersona({}, {},$scope.idUsuarioEliminar, serverConf.TEST_SERVER, function (respuesta) {
                // EXITO
               console.log("eliminado", respuesta.data);
            }, function (respuestaDeError) {
                // ERROR\
            });
        }, function () {
            console.log('cancelar');
        });
    };

    $scope.editarUsuario= function (row) {
      $scope.mostrar.formUsuario=true;
      $scope.operacion="editar";
        /*Creado por: Paola Mejia
         * Descripcion: Elimina el registro seleccionado por idUsuario*/
        cpanelService.getUsuarioById({}, {},row.entity.idUsuario, serverConf.TEST_SERVER, function (respuesta) {
            // EXITO
            $scope.usuarioPersona=respuesta.data;
            $scope.usuarioPersona.fechaExpiracion=new Date($scope.usuarioPersona.fechaExpiracion);
        }, function (respuestaDeError) {
            // ERROR\
        });
    };

    $scope.guardarUsuarioPersona=function() {
        console.log("usuarios para GRABAR---->", $scope.usuarioPersona);
        if ($scope.operacion == "adicionar") {
            cpanelService.adicionaUsuarioPersona($scope.usuarioPersona, {}, serverConf.TEST_SERVER, function (respuesta) {
                console.info("Guardado exitosamente", respuesta.data);
                $scope.usuarioPersona = {};
                $scope.mostrar.formUsuario = false;
                actualizarUsuarios()
                // EXITO
            })
        }
        if ($scope.operacion == "editar") {
            cpanelService.editUsuarioPersona($scope.usuarioPersona, {}, serverConf.TEST_SERVER, function (respuesta) {
                console.info("Modificado exitosamente", respuesta.data);
                $scope.usuarioPersona = {};
                $scope.mostrar.formUsuario = false;
                actualizarUsuarios()

            })
        };
        $scope.operacion="";
    }
    $scope.cancelarNuevoUsuario=function(){
      $scope.mostrar.formUsuario=false;
    };
})

