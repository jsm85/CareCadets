/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');
import RedirectService = require('common/redirect.service');

class ThanksController {
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
}

LazyLoading.Application.registerController('ThanksController', ThanksController);

export = ThanksController;