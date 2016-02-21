/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />
define(["require", "exports", 'common/lazyLoading.module', "common/redirect.service"], function (require, exports, LazyLoading) {
    var RoomController = (function () {
        function RoomController(scope, $timeout, redirectService, http) {
            this.timeout = $timeout;
            this.redirectService = redirectService;
            this.http = http;
            this.organizations = [];
            this.init();
            this.getOrganizations();
        }
        RoomController.prototype.init = function () {
            this.step = 0;
            this.message = '';
            this.item = '';
            this.location = '';
        };
        RoomController.prototype.startDonation = function () {
            this.step = 1;
            this.message = this.getMessage();
            this.item = '';
            this.location = '';
        };
        RoomController.prototype.getMessage = function () {
            if (this.step === 1) {
                return 'Mmm...What should I donate?';
            }
            if (this.step === 2) {
                return 'And which organization shall I bring it to?';
            }
            return '';
        };
        RoomController.prototype.back = function () {
            this.step--;
            this.message = this.getMessage();
        };
        RoomController.prototype.selectItem = function (item) {
            this.step = 2;
            this.message = this.getMessage();
            this.item = item;
        };
        RoomController.prototype.selectLocation = function (location) {
            this.step = 3;
            this.message = '';
            this.location = location;
        };
        RoomController.prototype.getOrganizations = function () {
            var _this = this;
            this.http({
                method: 'GET',
                url: 'http://169.45.223.101:8000/charities'
            }).then(function (result) {
                _this.organizations = result.data;
            });
        };
        RoomController.prototype.proceed = function () {
            console.log('Proceed');
        };
        RoomController.$inject = [
            '$scope',
            '$timeout',
            'RedirectService',
            '$http'
        ];
        return RoomController;
    })();
    LazyLoading.Application.registerController('RoomController', RoomController);
    return RoomController;
});
