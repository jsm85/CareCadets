define(["require", "exports"], function (require, exports) {
    var LocalStorageService = (function () {
        function LocalStorageService() {
        }
        LocalStorageService.prototype.getValue = function (key) {
            if (typeof (Storage) !== 'undefined') {
                var jsonString = localStorage.getItem('carecadets.' + key);
                return JSON.parse(jsonString);
            }
            else {
                return '';
            }
        };
        ;
        LocalStorageService.prototype.setValue = function (key, value) {
            if (typeof (Storage) !== 'undefined') {
                var stringified = JSON.stringify(value);
                localStorage.setItem('carecadets.' + key, stringified);
            }
        };
        ;
        return LocalStorageService;
    })();
    return LocalStorageService;
});
