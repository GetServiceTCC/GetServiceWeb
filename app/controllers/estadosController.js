'use strict';

app.controller('estadosController', function ($scope, $location, estadosService) {

    $scope.mensagem = "";

    $scope.estados = estadosService.query();

    $scope.deleteEstado = function (estado) {

        if (confirm('Deseja realmente deletar o estado ' + estado.nome + '?')) {

            estadosService.remove({ id: estado.id }, function () {

                var index = $scope.estados.indexOf(estado);

                $scope.estados.splice(index, 1);

                $scope.mensagem = "";

            }, function () {
                $scope.mensagem = "Não é possível remover o estado";
            });
        }
    }
});

app.controller('novoEstadoController', function ($scope, $location, estadosService) {

    $scope.mensagem = "";

    $scope.estado = {
        nome: "",
        uf: ""
    };

    $scope.salvar = function () {
        estadosService.save($scope.estado,
            function (response) {

                $location.path('/estados');

            },
         function (err) {
             console.log(err);
             $scope.mensagem = err.data.message;
         })
    };
});

app.controller('editarEstadoController', function ($scope, $location, $routeParams, estadosService) {

    $scope.mensagem = "";
        
    $scope.estado = estadosService.get({ id: $routeParams.id });

    $scope.salvar = function () {
        estadosService.update({ id: $routeParams.id }, $scope.estado,
            function (response) {

                $location.path('/estados');

            },
         function (err) {
             console.log(err);
             $scope.mensagem = err.data.message;
         })
    };
});