/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="common/lazyLoading.module" />

import LazyLoading = require('common/lazyLoading.module');

const Routes = [
	{url: '/', template: 'app/homepage/homepage.html', controller: 'homepage/homepage.controller', secure: false }
];

LazyLoading.Application.initializeAngular(Routes);
