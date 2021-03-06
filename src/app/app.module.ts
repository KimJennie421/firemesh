import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {AuthenticateService} from './services/authentication.service';
import {AngularFireAuthModule} from '@angular/fire/auth';

import * as firebase from 'firebase';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Geolocation } from '@ionic-native/geolocation/ngx';

firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireAuthModule,
        AngularFireModule,
        AngularFireModule.initializeApp(environment),
        AngularFirestoreModule,
        ReactiveFormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        AuthenticateService,
        Geolocation,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
