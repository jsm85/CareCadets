/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="common/lazyLoading.module" />
define(["require", "exports", 'common/lazyLoading.module', "common/lazyLoading.module"], function (require, exports, LazyLoading) {
    var Routes = [
        { url: '/', template: 'app/homepage/homepage.html', controller: 'homepage/homepage.controller', secure: false }
    ];
    LazyLoading.Application.initializeAngular(Routes);
});
