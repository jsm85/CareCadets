/// <reference path="../../typings/tsd.d.ts" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');

class ThanksController {
	http: ng.IHttpService;
	donationId: String;
	message: String;
	
	static $inject = [
		'$scope',
		'$routeParams',
		'$http'
	];

	constructor(scope: ng.IScope, $routeParams: any, $http: ng.IHttpService) {
		this.http = $http;
		this.donationId = $routeParams.donationId;
	}

	postThankYou() {
        this.http({
			method: 'POST',
			url: 'http://169.45.223.101:8000/thanks/' + this.donationId
		}).then((result) => {
			console.log(result);
        });
    }
}

LazyLoading.Application.registerController('ThanksController', ThanksController);

export = ThanksController;