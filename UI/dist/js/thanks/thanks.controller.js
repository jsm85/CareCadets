/// <reference path="../../typings/tsd.d.ts" />
define(["require", "exports", 'common/lazyLoading.module'], function (require, exports, LazyLoading) {
    var ThanksController = (function () {
        function ThanksController(scope, $routeParams, $http) {
            console.log('Hi');
            this.http = $http;
            this.donationId = $routeParams.donationId;
            this.message = '';
            this.getDonation();
        }
        ThanksController.prototype.getDonation = function () {
            var _this = this;
            this.http({
                method: 'GET',
                url: 'http://169.45.223.101:8000/donations/' + this.donationId
            }).then(function (result) {
                _this.donation = result;
                console.log(_this.donation);
            });
        };
        ThanksController.prototype.postThankYou = function () {
            this.http({
                method: 'POST',
                url: 'http://169.45.223.101:8000/thanks/' + this.donationId,
                data: this.message
            }).then(function (result) {
                console.log(result);
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
