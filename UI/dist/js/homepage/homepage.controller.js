/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />
define(["require", "exports", 'common/lazyLoading.module', "common/redirect.service"], function (require, exports, LazyLoading) {
    var HomepageController = (function () {
        function HomepageController(scope, $timeout, redirectService) {
            this.timeout = $timeout;
            this.redirectService = redirectService;
            this.email = 'guest';
            this.password = 'guest';
        }
        HomepageController.prototype.login = function () {
            if (this.email === 'guest' && this.password === 'guest') {
                this.redirectService.to('room');
            }
        };
        HomepageController.prototype.register = function () {
            this.redirectService.to('registration');
        };
        HomepageController.$inject = [
            '$scope',
            '$timeout',
            'RedirectService'
        ];
        return HomepageController;
    })();
    LazyLoading.Application.registerController('HomepageController', HomepageController);
    return HomepageController;
});
