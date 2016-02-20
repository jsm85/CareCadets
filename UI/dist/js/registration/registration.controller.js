/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />
define(["require", "exports", 'common/lazyLoading.module', "common/redirect.service"], function (require, exports, LazyLoading) {
    var RegistrationController = (function () {
        function RegistrationController(scope, $timeout, redirectService) {
            this.timeout = $timeout;
            this.redirectService = redirectService;
            this.avatars = ['boy', 'girl'];
            this.selectedAvatar = this.avatars[0];
        }
        RegistrationController.prototype.register = function () {
            this.redirectService.to('room');
        };
        RegistrationController.prototype.previousAvatar = function () {
            var index = this.avatars.indexOf(this.selectedAvatar) - 1;
            if (index < 0) {
                index = this.avatars.length - 1;
            }
            this.selectedAvatar = this.avatars[index];
        };
        RegistrationController.prototype.nextAvatar = function () {
            var index = this.avatars.indexOf(this.selectedAvatar) + 1;
            if (index >= this.avatars.length) {
                index = 0;
            }
            this.selectedAvatar = this.avatars[this.avatars.indexOf(this.selectedAvatar) + 1];
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
