/// <reference path="../../typings/tsd.d.ts" />
define(["require", "exports"], function (require, exports) {
    var IdentityService = (function () {
        function IdentityService() {
        }
        IdentityService.prototype.setUser = function (user) {
            this.user = user;
        };
        IdentityService.prototype.getUser = function () {
            return this.user;
        };
        IdentityService.prototype.isAuthenticated = function () {
            return this.user !== undefined;
        };
        return IdentityService;
    })();
    return IdentityService;
});
