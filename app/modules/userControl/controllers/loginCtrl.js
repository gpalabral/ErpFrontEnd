'use strict';

app.controller('loginCtrl', function ($rootScope, $scope, $state, userControlService,serverConf,
																			localStorageService, userPermission) {
	$scope.user = {
		username : '',
		password : ''
	};

	$scope.formData = {
		incorrectData: false
	};

	function init() {
		$state.go('menuBap');
	}

	$scope.login = function () {
		$scope.showLoader();
		$scope.formData.incorrectData = false;
		userControlService.login($scope.user,serverConf.TEST_SERVER,'POST', function (response) {
			// saving user information in local storage
			localStorageService.set('user', response.data);
			localStorageService.set('atributosPerfil', response.data.atributosPerfil);
			localStorageService.set('atributosEmpresa', response.data.atributosEmpresa);
			localStorageService.set('signedInTS', new Date().getTime());
			// todo: needs to configure user permissions.
			userPermission.setPermissions(response.data.modulos);
			$rootScope.userData = localStorageService.get('user');
			$rootScope.specialPermission = userPermission.setSpecialPermission($rootScope.userData);
			$rootScope.initSessionWatcher();
			// getting full list of users.
			$rootScope.userData = localStorageService.get('user');
			$state.go('menuBap');
			$scope.hideLoader();
			/*userControlService.admusuarioGetAll({},{},serverConf.TEST_SERVER,'GET',function (response) {
				$rootScope.hideLoader();
			}, function () {
				$rootScope.hideLoader();
			});*/
		}, function (response){
			// hidding password on failure
			$scope.formData.incorrectData = true;
			$scope.hideLoader();
		});
	};

	if( $scope.validUserSession() ) {
		init();
	} else {
		$rootScope.userData = undefined;
		$rootScope.moduloSeleccionado = undefined;
	}
});
