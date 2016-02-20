/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/global.module" />
/// <amd-dependency path="common/identity.service" />
define(["require", "exports", 'common/identity.service', 'common/localStorage.service', "common/global.module", "common/identity.service"], function (require, exports, IdentityService, LocalStorageService) {
    var LazyLoading;
    (function (LazyLoading) {
        var Application = (function () {
            function Application() {
            }
            Application.initializeAngular = function (routes) {
                Application.app = angular.module('app', ['ngRoute', 'ngCookies']);
                Application.config(routes);
            };
            /* this method is public for testing purposes only */
            Application.assignRegistrationMethods = function ($controllerProvider, $provide, $compileProvider) {
                Application.app.registerController = $controllerProvider.register;
                Application.app.registerService = $provide.service;
                Application.app.registerDirective = $compileProvider.directive;
            };
            /* this method is public for testing purposes only */
            Application.config = function (routes) {
                Application.app.config(['$routeProvider', '$controllerProvider', '$provide', '$compileProvider', '$httpProvider', function ($routeProvider, $controllerProvider, $provide, $compileProvider, $httpProvider) {
                        Application.assignRegistrationMethods($controllerProvider, $provide, $compileProvider);
                        routes.forEach(function (route) {
                            $routeProvider
                                .when(route.url, {
                                templateUrl: route.template,
                                settings: {
                                    secure: route.secure
                                },
                                resolve: {
                                    load: ['$q', function ($q) {
                                            var defered = $q.defer();
                                            require([route.controller], function () {
                                                defered.resolve();
                                            });
                                            return defered.promise;
                                        }]
                                }
                            });
                        });
                        // Initial services				
                        if (Application.app.registerService) {
                            Application.app.registerService('IdentityService', IdentityService);
                            Application.app.registerService('LocalStorageService', LocalStorageService);
                        }
                    }])
                    .run(['$rootScope', '$location', 'IdentityService', 'LocalStorageService', function ($rootScope, $location, identityService, localStorageService) {
                        $rootScope.$on('$routeChangeStart', function (event, next) {
                            if (next && next.$$route && next.$$route.settings && next.$$route.settings.secure && !identityService.isAuthenticated()) {
                                event.preventDefault();
                                $rootScope.$evalAsync(function () {
                                    if ($location.url() !== '') {
                                        localStorageService.setValue('referrer', $location.url());
                                    }
                                    $location.path('/login');
                                });
                                return;
                            }
                        });
                    }]);
            };
            Application.registerController = function (name, controller) {
                if (Application.app && Application.app.registerController) {
                    Application.app.registerController(name, controller);
                }
            };
            Application.registerService = function (name, service) {
                if (Application.app && Application.app.registerService) {
                    Application.app.registerService(name, service);
                }
            };
            Application.registerDirective = function (name, service) {
                if (Application.app && Application.app.registerDirective) {
                    Application.app.registerDirective(name, service);
                }
            };
            return Application;
        })();
        LazyLoading.Application = Application;
    })(LazyLoading || (LazyLoading = {}));
    return LazyLoading;
});
