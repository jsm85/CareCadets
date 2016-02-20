/// <reference path="../../typings/tsd.d.ts" />
/// <amd-dependency path="common/global.module" />
/// <amd-dependency path="common/identity.service" />

import Global = require('common/global.module');
import IdentityService = require('common/identity.service');
import LocalStorageService = require('common/localStorage.service');

module LazyLoading {

	export interface ILazyLoadModule extends ng.IModule {
		registerController(name: string, controller: any): void;
		registerService(name: string, service: any): void;    
		registerDirective(name: string, service: any): void;    
	}
	
	export class Application {
	
		static app: ILazyLoadModule;
		
		static initializeAngular(routes: any[]) {
			Application.app = <ILazyLoadModule>angular.module('app', ['ngRoute', 'ngCookies']);
			Application.config(routes);			
		}

		/* this method is public for testing purposes only */
		static assignRegistrationMethods($controllerProvider, $provide, $compileProvider) {
			Application.app.registerController = $controllerProvider.register;
			Application.app.registerService = $provide.service;
			Application.app.registerDirective = $compileProvider.directive;			
		}
						
		/* this method is public for testing purposes only */
		static config(routes: any[]): void {
			Application.app.config(['$routeProvider', '$controllerProvider', '$provide', '$compileProvider', '$httpProvider', ($routeProvider, $controllerProvider, $provide, $compileProvider, $httpProvider) => {

				Application.assignRegistrationMethods($controllerProvider, $provide, $compileProvider);
	
				routes.forEach((route) => {
					$routeProvider
						.when(route.url, {
							templateUrl: route.template,
							settings: {
								secure: route.secure
							},
							resolve: {
								load: ['$q', ($q) => {
									var defered = $q.defer();
									
									require([route.controller], () => { 
										defered.resolve(); 
									});
										
									return defered.promise;
								}]
							}
						});		        
				});
								
				// Initial services				
				if (Application.app.registerService) {
					Application.app.registerService('IdentityService', IdentityService);
					Application.app.registerService('LocalStorageService', LocalStorageService);
				}
				
			}])
			.run(['$rootScope', '$location', 'IdentityService', 'LocalStorageService', ($rootScope, $location, identityService, localStorageService) => {
				$rootScope.$on('$routeChangeStart', function(event, next) {															
					if (next && next.$$route && next.$$route.settings && next.$$route.settings.secure && !identityService.isAuthenticated()) {
						event.preventDefault();
						$rootScope.$evalAsync(function() {
							if ($location.url() !== '') {
								localStorageService.setValue('referrer', $location.url());
							}
							$location.path('/login');
						});		
						return;
					}					
				});
			}]);
		}
	
		static registerController(name: string, controller: any): void {
			if (Application.app && Application.app.registerController) {
				Application.app.registerController(name, controller);
			}
		}
	
		static registerService(name: string, service: any): void {
			if (Application.app && Application.app.registerService) {
				Application.app.registerService(name, service);
			}
		}
	
		static registerDirective(name: string, service: any): void {
			if (Application.app && Application.app.registerDirective) {
				Application.app.registerDirective(name, service);
			}		
		}
	
	}	
}

export = LazyLoading
