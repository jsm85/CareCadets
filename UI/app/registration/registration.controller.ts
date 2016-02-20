/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');
import RedirectService = require('common/redirect.service');

class RegistrationController {
	timeout: ng.ITimeoutService;
	redirectService: RedirectService;

    static $inject = [
		'$scope',
		'$timeout',
		'RedirectService'
    ];

	constructor(scope: ng.IScope, $timeout: ng.ITimeoutService, redirectService: RedirectService) {
		this.timeout = $timeout;
		this.redirectService = redirectService;
	}
    
    register() {
        this.redirectService.to('room');
    }    
}

LazyLoading.Application.registerController('RegistrationController', RegistrationController);

export = RegistrationController;