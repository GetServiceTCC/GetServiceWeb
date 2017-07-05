'use strict';
app.factory('subCategoriasService', function (consts, $resource) {
    return $resource(consts.urlApiBase + 'api/subCategorias/:id', { id: '@id' }, {
        update: { method: 'PUT' },
        query: { method: 'get', isArray: true }
    });
});