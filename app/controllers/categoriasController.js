'use strict';

app.controller('categoriasController', function ($scope, $location, categoriasService) {

    $scope.mensagem = "";

    $scope.categorias = categoriasService.query();

    $scope.deleteCategoria = function (categoria) {

        if (confirm('Deseja realmente deletar a categoria ' + categoria.descricao + '?')) {

            categoriasService.remove({ id: categoria.id }, function () {

                var index = $scope.categorias.indexOf(categoria);

                $scope.categorias.splice(index, 1);

                $scope.mensagem = "";

            }, function () {
                $scope.mensagem = "Não é possível remover a categoria";
            });
        }
    }
});

app.controller('novaCategoriaController', function ($scope, $location, categoriasService) {

    $scope.mensagem = "";

    $scope.categoria = {
        nome: "",
        uf: ""
    };

    $scope.salvar = function () {
        categoriasService.save($scope.categoria,
            function (response) {

                $location.path('/categorias');

            },
         function (err) {
             console.log(err);
             $scope.mensagem = err.data.message;
         })
    };
});

app.controller('editarCategoriaController', function ($scope, $location, $routeParams, categoriasService) {

    $scope.mensagem = "";

    $scope.categoria = categoriasService.get({ id: $routeParams.id });

    $scope.salvar = function () {
        categoriasService.update({ id: $routeParams.id }, $scope.categoria,
            function (response) {

                $location.path('/categorias');

            },
         function (err) {
             console.log(err);
             $scope.mensagem = err.data.message;
         })
    };
});