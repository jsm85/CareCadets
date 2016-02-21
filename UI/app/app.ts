/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="common/lazyLoading.module" />

import LazyLoading = require('common/lazyLoading.module');

const Routes = [
	{url: '/', template: 'app/homepage/homepage.html', controller: 'homepage/homepage.controller', secure: false },
	{url: '/login', template: 'app/homepage/homepage.html', controller: 'homepage/homepage.controller', secure: false },
	{url: '/registration', template: 'app/registration/registration.html', controller: 'registration/registration.controller', secure: false },
	{url: '/room', template: 'app/room/room.html', controller: 'room/room.controller', secure: false },
  {url: '/thanks/:donationId', template: 'app/thanks/thanks.html', controller: 'thanks/thanks.controller', secure: false },
  {url: '/glossary', template: 'app/glossary/glossary.html', controller: 'glossary/glossary.controller', secure: false },
];

LazyLoading.Application.initializeAngular(Routes);
