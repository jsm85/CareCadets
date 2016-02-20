/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />
define(["require", "exports", 'common/lazyLoading.module', "common/redirect.service"], function (require, exports, LazyLoading) {
    var RegistrationController = (function () {
        function RegistrationController(scope, $timeout, redirectService) {
            this.timeout = $timeout;
            this.redirectService = redirectService;
        }
        RegistrationController.prototype.register = function () {
            this.redirectService.to('room');
        };
        RegistrationController.$inject = [
            '$scope',
            '$timeout',
            'RedirectService'
        ];
        return RegistrationController;
    })();
    LazyLoading.Application.registerController('RegistrationController', RegistrationController);
    return RegistrationController;
});
