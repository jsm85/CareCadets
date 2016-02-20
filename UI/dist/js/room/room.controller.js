/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />
define(["require", "exports", 'common/lazyLoading.module', "common/redirect.service"], function (require, exports, LazyLoading) {
    var RoomController = (function () {
        function RoomController(scope, $timeout, redirectService) {
            this.timeout = $timeout;
            this.redirectService = redirectService;
        }
        RoomController.$inject = [
            '$scope',
            '$timeout',
            'RedirectService'
        ];
        return RoomController;
    })();
    LazyLoading.Application.registerController('RoomController', RoomController);
    return RoomController;
});
