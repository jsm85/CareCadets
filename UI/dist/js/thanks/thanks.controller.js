/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />
define(["require", "exports", 'common/lazyLoading.module', "common/redirect.service"], function (require, exports, LazyLoading) {
    var ThanksController = (function () {
        function ThanksController(scope, $timeout, redirectService) {
            this.timeout = $timeout;
            this.redirectService = redirectService;
        }
        ThanksController.$inject = [
            '$scope',
            '$timeout',
            'RedirectService'
        ];
        return ThanksController;
    })();
    LazyLoading.Application.registerController('ThanksController', ThanksController);
    return ThanksController;
});
