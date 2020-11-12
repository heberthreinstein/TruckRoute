import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PlaceSearchModule } from './modules/place-search/place-search.module';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';


const config = {
  apiKey: 'AIzaSyDS0BjPL0G3kBe44zfV-bRLPELOtbmVmsU',
  authDomain: 'truckerroutes.firebaseapp.com',
  databaseURL: 'https://truckerroutes.firebaseio.com',
  projectId: 'truckerroutes',
  storageBucket: 'truckerroutes.appspot.com',
  messagingSenderId: '41240103871',
  appId: '1:41240103871:web:3307fd486b5f8cddb02f0a',
  measurementId: 'G-D47SQ023GD'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
