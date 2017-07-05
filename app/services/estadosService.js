'use strict';
app.factory('estadosService', function (consts, $resource) {
    return $resource(consts.urlApiBase + 'api/estados/:id', { id: '@id' }, {
        update: { method:'PUT' },
        query: { method: 'get', isArray: true }
    });
});