'use strict';

/*
* Copyright © Mythical Rawr 2014-2019
* Authors: Eduardo de Sousa Fernandes
* Website: www.failcake.me
*/

import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var cordova: any;

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(private platform: Platform,
                private zone: NgZone) { }
}