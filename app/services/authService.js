'use strict';
app.factory('authService', function ($http, $q, consts, localStorageService) {

    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&client_id=GetServiceWeb&client_secret=web@123";

        var deferred = $q.defer();

        $http.post(consts.urlApiBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(
            function (response) {

                localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName });

                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;

                deferred.resolve(response);

            }, function (err, status) {
                deferred.reject(err);
            }
        );

        return deferred.promise;

    };

    var _logOut = function () {

        $http.post(consts.urlApiBase + 'api/conta/logout').then(function () {

            _clearSession();

        }, function () {
            _clearSession();
        });

    };

    var _clearSession = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
    }

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
});