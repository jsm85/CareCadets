/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');
import RedirectService = require('common/redirect.service');

class GlossaryController {
	
	static $inject = [
		'$scope'
	];

	constructor(scope: ng.IScope) {
		console.log('hi');
	}
}

LazyLoading.Application.registerController('GlossaryController', GlossaryController);

export = GlossaryController;