/// <reference path="../../typings/tsd.d.ts" />
define(["require", "exports", 'common/lazyLoading.module'], function (require, exports, LazyLoading) {
    var ThanksController = (function () {
        function ThanksController(scope, $routeParams, $http) {
            this.http = $http;
            this.donationId = $routeParams.donationId;
            this.message = 'Thank you so much for your donation!';
            this.message2 = '';
            this.message3 = '';
            this.isSent = false;
            this.getDonation();
        }
        ThanksController.prototype.getDonation = function () {
            var _this = this;
            this.http({
                method: 'GET',
                url: 'http://169.45.223.101:8000/donations/' + this.donationId
            }).then(function (result) {
                _this.donation = result;
            });
        };
        ThanksController.prototype.postThankYou = function () {
            var _this = this;
            this.http({
                method: 'POST',
                url: 'http://169.45.223.101:8000/thanks/' + this.donationId,
                data: { message: this.message + this.message2 + this.message3 }
            }).then(function (result) {
                _this.isSent = true;
            });
        };
        ThanksController.$inject = [
            '$scope',
            '$routeParams',
            '$http'
        ];
        return ThanksController;
    })();
    LazyLoading.Application.registerController('ThanksController', ThanksController);
    return ThanksController;
});
