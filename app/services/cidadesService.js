'use strict';
app.factory('cidadesService', function (consts, $resource) {
    return $resource(consts.urlApiBase + 'api/cidades/:id', { id: '@id' }, {
        update: { method: 'PUT' },
        query: { method: 'get', isArray: true }
    });
});