var app = angular.module('GetServiceWeb', ['ngRoute', 'ngResource', 'LocalStorageModule', 'angular-loading-bar']);

app.constant('consts', {
    urlApiBase: 'http://localhost:5000/'
});

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/estados", {
        controller: "estadosController",
        templateUrl: "/app/views/estados/listar.html"
    });

    $routeProvider.when("/estados/novo", {
        controller: "novoEstadoController",
        templateUrl: "/app/views/estados/editar.html"
    });

    $routeProvider.when("/estados/:id", {
        controller: "editarEstadoController",
        templateUrl: "/app/views/estados/editar.html"
    });

    $routeProvider.when("/cidades", {
        controller: "cidadesController",
        templateUrl: "/app/views/cidades/listar.html"
    });

    $routeProvider.when("/cidades/novo", {
        controller: "novaCidadeController",
        templateUrl: "/app/views/cidades/editar.html"
    });

    $routeProvider.when("/cidades/:id", {
        controller: "editarCidadeController",
        templateUrl: "/app/views/cidades/editar.html"
    });

    $routeProvider.when("/categorias", {
        controller: "categoriasController",
        templateUrl: "/app/views/categorias/listar.html"
    });

    $routeProvider.when("/categorias/novo", {
        controller: "novaCategoriaController",
        templateUrl: "/app/views/categorias/editar.html"
    });

    $routeProvider.when("/categorias/:id", {
        controller: "editarCategoriaController",
        templateUrl: "/app/views/categorias/editar.html"
    });

    $routeProvider.when("/subCategorias", {
        controller: "subCategoriasController",
        templateUrl: "/app/views/subCategorias/listar.html"
    });

    $routeProvider.when("/subCategorias/novo", {
        controller: "novaSubCategoriaController",
        templateUrl: "/app/views/subCategorias/editar.html"
    });

    $routeProvider.when("/subCategorias/:id", {
        controller: "editarSubCategoriaController",
        templateUrl: "/app/views/subCategorias/editar.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

    $locationProvider.hashPrefix('');
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);