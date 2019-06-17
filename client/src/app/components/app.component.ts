'use strict';

/*
* Copyright © Mythical Rawr 2014-2019
* Authors: Eduardo de Sousa Fernandes
* Website: www.failcake.me
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AppService } from '../services/appService';

@Component({
    selector: 'audbox-app',
    templateUrl: '../views/components/app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    /**
     * AppComponent constructor
     * @constructor
     *
     * @returns {void}
     */
    constructor(private platform: Platform,
                private app: AppService) {
    }

    /**
     * Implements OnInit and starts up the services
     *
     * @returns {void}
     */
    public ngOnInit(): void {
        this.platform.ready().then(() => {

        });
    }

    /**
     * Implements onDestroy
     *
     * @returns {void}
     */
    public ngOnDestroy(): void { }

    /**
     * Returns true if application is running on a mobile
     *
     * @returns {boolean}
     */
    public isMobile(): boolean {
        return this.platform.is('cordova');
    }
    
    /**
     * Binds observables
     *
     * @returns {void}
     */
    private bindObservables(): void {}
    
    /**
     * Binds observables
     *
     * @returns {void}
     */
    private unbindObservables(): void {} 
}
