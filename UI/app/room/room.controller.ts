/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');
import RedirectService = require('common/redirect.service');

class RoomController {
	timeout: ng.ITimeoutService;
	redirectService: RedirectService;
    http: ng.IHttpService;
    step: number;
    message: string;
    item: string;
    location: string;
    action: string;
    text: any;
    organizations: any;
    donationId: string;

    static $inject = [
		'$scope',
		'$timeout',
		'RedirectService',
        '$http'
    ];

	constructor(scope: ng.IScope, $timeout: ng.ITimeoutService, redirectService: RedirectService, http: ng.IHttpService) {
		this.timeout = $timeout;
		this.redirectService = redirectService;
        this.http = http;
        this.organizations = [];
        this.donationId = '';        
        
        this.init();
	}    
    
    init() {
        this.step = 0;
        this.message = '';
        this.item = '';
        this.location = '';
    }
    
    startDonation() {
        this.step = 1;
        this.message = this.getMessage();
        this.item = '';
        this.location = '';        
    }
    
    getMessage() {
        if (this.step === 1) {
            return 'Mmm...What should I donate?';
        }
        
        if (this.step === 2) {
            return 'And which organization shall I bring it to?';
        }
        
        return '';
    }
    
    back() {
        this.step--;
        this.message = this.getMessage();
    }
    
    selectItem(item: string) {
        this.step = 2;
        this.message = this.getMessage();
        this.item = item;
    }
    
    selectLocation(location: string) {
        this.step = 3;
        this.message = '';
        this.location = location;
        this.getOrganizations();
    }
    
    getText() {        
        this.http({
			method: 'GET',
			url: 'http://169.45.223.101:8000/pages/rose/' + this.item + '/' + this.location 
		}).then((result) => {
            this.text = result.data;
        });
    }
    
    getOrganizations() {
        this.http({
			method: 'GET',
			url: 'http://169.45.223.101:8000/charities/' + this.location
		}).then((result) => {
            this.organizations = result.data;
            this.timeout(() => {
                $('.summary').addClass('appear');
            }, 1000);            
        });
    }    
    
    proceed() {
        this.step = 4;
        this.http({
			method: 'POST',
			url: 'http://169.45.223.101:8000/donations',
            data: {
                user: 'guest',
                item: this.item,
                location: this.location
            }
		}).then((result) => {
            this.donationId = (<any>result)._id;
        });
    }
    
    print() {
        window.print();
    }
}

LazyLoading.Application.registerController('RoomController', RoomController);

export = RoomController;