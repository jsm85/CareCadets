/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />
define(["require", "exports", 'common/lazyLoading.module', "common/redirect.service"], function (require, exports, LazyLoading) {
    var RoomController = (function () {
        function RoomController(scope, $timeout, redirectService, http) {
            this.timeout = $timeout;
            this.redirectService = redirectService;
            this.http = http;
            this.init();
        }
        RoomController.prototype.init = function () {
            this.step = 0;
            this.message = '';
            this.item = '';
            this.location = '';
            this.organizations = [];
            this.donationId = '';
            this.bitlyUrl = '';
            this.showBadge = false;
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
            this.getOrganizations();
            this.getText();
        };
        RoomController.prototype.getText = function () {
            var _this = this;
            this.http({
                method: 'GET',
                url: 'http://169.45.223.101:8000/pages/guest/' + this.item + '/' + this.location
            }).then(function (result) {
                _this.text = result.data;
            });
        };
        RoomController.prototype.getOrganizations = function () {
            var _this = this;
            this.http({
                method: 'GET',
                url: 'http://169.45.223.101:8000/charities/' + this.location
            }).then(function (result) {
                _this.organizations = result.data;
                _this.timeout(function () {
                    $('.summary').addClass('appear');
                }, 500);
            });
        };
        RoomController.prototype.proceed = function () {
            var _this = this;
            this.http({
                method: 'POST',
                url: 'http://169.45.223.101:8000/donations',
                data: {
                    user: 'guest',
                    item: this.item,
                    location: this.location
                }
            }).then(function (result) {
                _this.donationId = result.data.insertedIds[0];
                _this.bitly();
            });
        };
        RoomController.prototype.bitly = function () {
            var _this = this;
            this.http({
                method: 'GET',
                url: 'https://api-ssl.bitly.com/v3/shorten?access_token=c47fc429f20a73230d3e9023ffc0c24cc10d87ab&longUrl=http%3A%2F%2F169.45.223.101%2Fapp%2F%23%2Fthanks%2F' + this.donationId
            }).then(function (result) {
                _this.step = 4;
                _this.bitlyUrl = result.data.data.url;
            });
        };
        RoomController.prototype.print = function () {
            var _this = this;
            this.location = '';
            this.showBadge = true;
            this.timeout(function () {
                _this.timeout(function () {
                    window.print();
                }, 1500);
            }, 500);
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
