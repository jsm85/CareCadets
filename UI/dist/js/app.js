/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="common/lazyLoading.module" />
define(["require", "exports", 'common/lazyLoading.module', "common/lazyLoading.module"], function (require, exports, LazyLoading) {
    var Routes = [
        { url: '/', template: 'app/homepage/homepage.html', controller: 'homepage/homepage.controller', secure: false },
        { url: '/login', template: 'app/homepage/homepage.html', controller: 'homepage/homepage.controller', secure: false },
        { url: '/registration', template: 'app/registration/registration.html', controller: 'registration/registration.controller', secure: false },
        { url: '/room', template: 'app/room/room.html', controller: 'room/room.controller', secure: true },
        { url: '/thanks', template: 'app/thanks/thanks.html', controller: 'thanks/thanks.controller', secure: false },
    ];
    LazyLoading.Application.initializeAngular(Routes);
});
