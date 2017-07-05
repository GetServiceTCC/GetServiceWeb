'use strict';
app.controller('loginController', function ($scope, $location, authService) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.mensagem = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {

            $location.path('/home');

        },
         function (err) {
             $scope.mensagem = err.data.error_description;
         });
    };

});