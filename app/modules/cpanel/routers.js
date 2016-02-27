(function() {
	'use strict';

	angular.module('myApp')
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// modulo de cpanel
				.state('usuarios', {
					url: '/usuarios',
					views: {
						'': {
							templateUrl: 'modules/cpanel/views/usuarios.html',
							controller: 'usuariosCtrl'
						}
					}
				})
				.state('role', {
					url: '/roles',
					templateUrl: 'modules/cpanel/views/tabRoles.html',
					controller: 'tabRoleCtrl'
				})
				.state('role.adiciona', {
					url: '/adiciona',
					views: {
						'roles-container': {
							templateUrl: 'modules/cpanel/views/role.html',
							controller: 'roleAdicionaCtrl'
						}
					}
				})
				.state('role.modifica', {
					url: '/modifica/:idRol',
					views: {
						'roles-container': {
							templateUrl: 'modules/cpanel/views/role.html',
							controller: 'roleModificaCtrl'
						}
					}
				})
				.state('administracionRoles', {
					url: '/administracionRoles',
					views: {
						'': {
							templateUrl: 'modules/cpanel/views/administracionRoles.html',
							controller: 'administracionRolesCtrl'
						}
					}
				})
                .state('datosEmpresa', {
                    url: '/datosEmpresa',
                    templateUrl: 'modules/cpanel/views/datosEmpresa.html'
                })
                .state('perfilUsuario', {
                    url: '/perfilUsuario',
                    views: {
                        '': {
                            templateUrl: 'modules/cpanel/views/perfilUsuario.html',
                            controller: 'perfilUsuarioCtrl'
                        }
                    }
                })
                .state('empresa', {
                    url: '/empresa',
                    templateUrl: 'modules/cpanel/views/empresa.html',
										controller: 'empresaCtrl',
										resolve: {
											empresaDatos : function (cpanelService, serverConf, $q) {
												var deferred = $q.defer();
												cpanelService.getDatosEmpresa({},{},serverConf.CPANEL_WS, function(response){
													deferred.resolve(response.data[0]);
												}, function ( ) {
													deferred.reject(null);
												});
												return deferred.promise;
											}
										}
                })
                .state('prueba', {
                    url: '/prueba',
                    templateUrl: 'modules/cpanel/views/prueba.html'
                })
            ;
		}])
})();

