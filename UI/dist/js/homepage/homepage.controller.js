/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />
define(["require", "exports", 'common/lazyLoading.module', "common/redirect.service"], function (require, exports, LazyLoading) {
    var HomepageController = (function () {
        function HomepageController(scope, $timeout, redirectService) {
            this.timeout = $timeout;
            this.redirectService = redirectService;
        }
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
