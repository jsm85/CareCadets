/// <reference path="../../typings/tsd.d.ts" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');

class ThanksController {
	http: ng.IHttpService;
	donationId: String;
	message: String;
	donation: any;
	
	static $inject = [
		'$scope',
		'$routeParams',
		'$http'
	];

	constructor(scope: ng.IScope, $routeParams: any, $http: ng.IHttpService) {
        
        console.log('Hi');
        
		this.http = $http;
		this.donationId = $routeParams.donationId;
		this.message = '';

		this.getDonation();
	}

	getDonation() {
		this.http({
			method: 'GET',
			url: 'http://169.45.223.101:8000/donations/' + this.donationId
		}).then((result) => {
			this.donation = result;
			console.log(this.donation);
        });
	}

	postThankYou() {
        this.http({
			method: 'POST',
			url: 'http://169.45.223.101:8000/thanks/' + this.donationId,
			data: this.message
		}).then((result) => {
			console.log(result);
        });
    }
}

LazyLoading.Application.registerController('ThanksController', ThanksController);

export = ThanksController;