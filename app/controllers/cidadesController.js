'use strict';

app.controller('cidadesController', function ($scope, $location, cidadesService) {

    $scope.mensagem = "";

    $scope.cidades = cidadesService.query();

    $scope.deleteCidade = function (cidade) {

        if (confirm('Deseja realmente deletar a cidade ' + cidade.nome + '?')) {

            cidadesService.remove({ id: cidade.id }, function () {

                var index = $scope.cidades.indexOf(cidade);

                $scope.cidades.splice(index, 1);

                $scope.mensagem = "";

            }, function () {
                $scope.mensagem = "Não é possível remover a cidade";
            });
        }
    }
});

app.controller('novaCidadeController', function ($scope, $location, estadosService, cidadesService) {

    $scope.mensagem = "";

    $scope.estados = estadosService.query();

    $scope.cidade = {
        nome: "",
        estadoId: ""
    };

    $scope.salvar = function () {
        cidadesService.save($scope.cidade,
            function (response) {

                $location.path('/cidades');

            },
         function (err) {
             console.log(err);
             $scope.mensagem = err.data.message;
         })
    };
});

app.controller('editarCidadeController', function ($scope, $location, $routeParams, estadosService, cidadesService) {

    $scope.mensagem = "";

    $scope.estados = estadosService.query();

    $scope.cidade = cidadesService.get({ id: $routeParams.id });

    $scope.salvar = function () {
        cidadesService.update({ id: $routeParams.id }, $scope.cidade,
            function (response) {

                $location.path('/cidades');

            },
         function (err) {
             console.log(err);
             $scope.mensagem = err.data.message;
         })
    };
});