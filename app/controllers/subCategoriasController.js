'use strict';

app.controller('subCategoriasController', function ($scope, $location, subCategoriasService) {

    $scope.mensagem = "";

    $scope.subCategorias = subCategoriasService.query();

    $scope.deleteSubCategoria = function (subCategoria) {

        if (confirm('Deseja realmente deletar a subcategoria ' + subCategoria.descricao + '?')) {

            subCategoriasService.remove({ id: subCategoria.id }, function () {

                var index = $scope.subCategorias.indexOf(subCategoria);

                $scope.subCategorias.splice(index, 1);

                $scope.mensagem = "";

            }, function () {
                $scope.mensagem = "Não é possível remover a subcategoria";
            });
        }
    }
});

app.controller('novaSubCategoriaController', function ($scope, $location, categoriasService, subCategoriasService) {

    $scope.mensagem = "";

    $scope.categorias = categoriasService.query();

    $scope.subCategoria = {
        nome: "",
        categoriaId: ""
    };

    $scope.salvar = function () {
        subCategoriasService.save($scope.subCategoria,
            function (response) {

                $location.path('/subCategorias');

            },
         function (err) {
             console.log(err);
             $scope.mensagem = err.data.message;
         })
    };
});

app.controller('editarSubCategoriaController', function ($scope, $location, $routeParams, categoriasService, subCategoriasService) {

    $scope.mensagem = "";

    $scope.categorias = categoriasService.query();

    $scope.subCategoria = subCategoriasService.get({ id: $routeParams.id });

    $scope.salvar = function () {
        subCategoriasService.update({ id: $routeParams.id }, $scope.subCategoria,
            function (response) {

                $location.path('/subCategorias');

            },
         function (err) {
             console.log(err);
             $scope.mensagem = err.data.message;
         })
    };
});