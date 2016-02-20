/// <reference path="../../typings/tsd.d.ts" />
define(["require", "exports", 'common/lazyLoading.module'], function (require, exports, LazyLoading) {
    var RedirectService = (function () {
        function RedirectService($location, $window) {
            this.location = $location;
            this.window = $window;
        }
        RedirectService.prototype.to = function (route) {
            if (route !== null && route.indexOf('http') > -1) {
                this.window.open(route, '_blank');
            }
            else {
                this.location.path(route);
            }
        };
        RedirectService.prototype.back = function () {
            var minimumHistory = 4;
            if (this.window.history.length <= minimumHistory) {
                this.to('/');
            }
            else {
                this.window.history.back();
            }
        };
        RedirectService.$inject = [
            '$location',
            '$window'
        ];
        return RedirectService;
    })();
    LazyLoading.Application.registerService('RedirectService', RedirectService);
    return RedirectService;
});
