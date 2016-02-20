/// <reference path="../../typings/tsd.d.ts" />

import LazyLoading = require('common/lazyLoading.module');

class RedirectService {
	location: ng.ILocationService;
	window: ng.IWindowService;

	static $inject = [
		'$location',
		'$window'
	];

	constructor($location: ng.ILocationService, $window: ng.IWindowService) {
		this.location = $location;
		this.window = $window;
	}

	to(route: string) {
        if (route !== null && route.indexOf('http') > -1) {
            this.window.open(route, '_blank');
        } else {        
		  this.location.path(route);
        }
	}

	back() {
		let minimumHistory = 4;
		
		if (this.window.history.length <= minimumHistory) {
			this.to('/');
		} else {
			this.window.history.back();
		}
	}

}

LazyLoading.Application.registerService('RedirectService', RedirectService);

export = RedirectService