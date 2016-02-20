/// <reference path="../typings/tsd.d.ts" />

require.config({
	paths: {
        'app': 'app'
	},
	shim: {
	    'app': {
            deps: []
        }
	},
    deps:  [],
    callback: null,
    baseUrl: '/dist/js',
    urlArgs: 'v=1.0'
});

require(['app'], function() {
    angular.bootstrap(document, ['app']);
});

// Force dependencies for the optimize gulp step

require([
]);