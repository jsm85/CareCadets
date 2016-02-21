/// <reference path="../../typings/tsd.d.ts" />
define(["require", "exports", 'common/lazyLoading.module'], function (require, exports, LazyLoading) {
    var ThanksController = (function () {
        function ThanksController(scope, $http) {
            this.http = $http;
        }
        ThanksController.prototype.postThankYou = function () {
            this.http({
                method: 'POST',
                url: 'http://169.45.223.101:8000/thanks/' + this.donationId
            }).then(function (result) {
                console.log(result);
            });
        };
        ThanksController.$inject = [
            '$scope',
            '$http'
        ];
        return ThanksController;
    })();
    LazyLoading.Application.registerController('ThanksController', ThanksController);
    return ThanksController;
});
