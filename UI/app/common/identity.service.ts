/// <reference path="../../typings/tsd.d.ts" />

class IdentityService {
	user: any;
		
	setUser(user: any) {
		this.user = user;
	}
	
	getUser(): any {
		return this.user;
	}
	
	isAuthenticated(): boolean {
		return this.user !== undefined;
	}	
}

// This service is registered in LazyLoading module

export = IdentityService;
