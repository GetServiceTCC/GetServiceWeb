'use strict';
app.factory('categoriasService', function (consts, $resource) {
    return $resource(consts.urlApiBase + 'api/categorias/:id', { id: '@id' }, {
        update: { method: 'PUT' },
        query: { method: 'get', isArray: true }
    });
});