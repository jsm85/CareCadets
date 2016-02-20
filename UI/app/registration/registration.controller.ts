/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/redirect.service" />

import Global = require('common/global.module');
import LazyLoading = require('common/lazyLoading.module');
import RedirectService = require('common/redirect.service');

class RegistrationController {
	timeout: ng.ITimeoutService;
	redirectService: RedirectService;
    avatars: Array<string>;
    selectedAvatar: string;

    static $inject = [
		'$scope',
		'$timeout',
		'RedirectService'
    ];

	constructor(scope: ng.IScope, $timeout: ng.ITimeoutService, redirectService: RedirectService) {
		this.timeout = $timeout;
		this.redirectService = redirectService;
        this.avatars = ['boy', 'girl'];
        this.selectedAvatar = this.avatars[0];
	}
    
    register() {
        this.redirectService.to('room');
    }    
    
    previousAvatar() {
        let index = this.avatars.indexOf(this.selectedAvatar) - 1;
        
        if (index < 0) {
            index = this.avatars.length - 1;
        }
        
        this.selectedAvatar = this.avatars[index];
    }
    
    nextAvatar() {
        let index = this.avatars.indexOf(this.selectedAvatar) + 1;
        
        if (index >= this.avatars.length) {
            index = 0;
        }
        
        this.selectedAvatar = this.avatars[this.avatars.indexOf(this.selectedAvatar) + 1];        
    }
}

LazyLoading.Application.registerController('RegistrationController', RegistrationController);

export = RegistrationController;