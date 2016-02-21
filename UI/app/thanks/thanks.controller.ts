/// <reference path="../../typings/tsd.d.ts" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');

class ThanksController {
	http: ng.IHttpService;
	donationId: String;
	donation: any;
    message: string;
    message2: string;
    message3: string;
    isSent: boolean;
	
	static $inject = [
		'$scope',
		'$routeParams',
		'$http'
	];

	constructor(scope: ng.IScope, $routeParams: any, $http: ng.IHttpService) {        
		this.http = $http;
		this.donationId = $routeParams.donationId;
		this.message = 'Thank you so much for your donation!';
        this.message2 = '';
        this.message3 = '';
        this.isSent = false;

		this.getDonation();
	}

	getDonation() {
		this.http({
			method: 'GET',
			url: 'http://169.45.223.101:8000/donations/' + this.donationId
		}).then((result) => {
			this.donation = result;
        });
	}

	postThankYou() {
        this.http({
			method: 'POST',
			url: 'http://169.45.223.101:8000/thanks/' + this.donationId,
			data: { message: this.message + this.message2 + this.message3 }
		}).then((result) => {
            this.isSent = true;
        });
    }
}

LazyLoading.Application.registerController('ThanksController', ThanksController);

export = ThanksController;