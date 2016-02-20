/// <reference path="../../typings/tsd.d.ts" />
define(["require", "exports"], function (require, exports) {
    var Global;
    (function (Global) {
        Global.DefaultErrorMessage = 'Sorry, there has been an error accessing the server.';
    })(Global || (Global = {}));
    return Global;
});
