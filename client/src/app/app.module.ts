'use strict';

/*
* Copyright © Mythical Rawr 2014-2019
* Authors: Eduardo de Sousa Fernandes
* Website: www.failcake.me
*/

import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//======= OTHERS =======//
import { NgxElectronModule } from 'ngx-electron';
import { AudioContextModule } from 'angular-audio-context';

//======= IONIC =======//
import { IonicModule } from '@ionic/angular';

//======= COMPONENTS =======//
import { AppComponent } from './components/app.component';

//======= ELEMENTS =======//

//======= SERVICES =======//
import { AppService } from './services/appService';

//======= DIRECTIVES =======//

//======= PIPES =======//
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
    imports: [
        BrowserModule,
        NgxElectronModule,
        FormsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AudioContextModule.forRoot('balanced')
    ],
    providers: [
        // ROUTER //
        {provide: APP_BASE_HREF, useValue : './' },

        // SERVICES //
        AppService,
    ],
    entryComponents: [
        AppComponent
    ],
    declarations: [
        // COMPONENTS //
        AppComponent,

        // PIPE //
        SafePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }