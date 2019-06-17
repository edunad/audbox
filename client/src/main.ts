'use strict';

/*
* Copyright © Mythical Rawr 2014-2019
* Authors: Eduardo de Sousa Fernandes
* Website: www.failcake.me
*/

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    console.debug('[AUDBOX] Production mode enabled!');
    enableProdMode(); // Enable production mode
}

platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.warn(err));