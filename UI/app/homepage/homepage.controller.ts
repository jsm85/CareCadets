/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');
import RedirectService = require('common/redirect.service');

class HomepageController {
	timeout: ng.ITimeoutService;
	redirectService: RedirectService;
    email: string;
    password: string;

    static $inject = [
		'$scope',
		'$timeout',
		'RedirectService'
    ];

	constructor(scope: ng.IScope, $timeout: ng.ITimeoutService, redirectService: RedirectService) {
		this.timeout = $timeout;
		this.redirectService = redirectService;
        
        this.email = 'guest';
        this.password = 'guest';
	}    
    
    login() {        
        if (this.email === 'guest' && this.password === 'guest') {
            this.redirectService.to('room');
        }
    }
    
    register() {
        this.redirectService.to('registration');        
    }    
}

LazyLoading.Application.registerController('HomepageController', HomepageController);

export = HomepageController;