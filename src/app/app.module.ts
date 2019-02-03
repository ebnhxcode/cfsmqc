import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase config.
import { firebaseConfig } from './servicios/databases/firebase-config';
import { authPassportConfig } from './servicios/authbasic/auth-passport-config';


// Firebase libs
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpModule } from '@angular/http';
import { ModalformulariocalidadPageModule } from './componentes/calculocalidad/modals/modalformulariocalidad/modalformulariocalidad.module';
import { ModalformulariocondicionPageModule } from './componentes/calculocondicion/modals/modalformulariocondicion/modalformulariocondicion.module';
import { ModalformulariocalidadcondicionPageModule } from './componentes/calidadcondicionmenu/modals/modalformulariocalidadcondicion/modalformulariocalidadcondicion.module';

// QR/BAR Scanner libs
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// Laravel Passport libs
import { LaravelPassportModule } from 'laravel-passport';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(),
    
    LaravelPassportModule.forRoot({
      apiRoot: authPassportConfig.apiRoot, 
      clientId: authPassportConfig.clientId, 
      clientSecret: authPassportConfig.clientSecret
    }),

    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireAuthModule,

    ModalformulariocalidadPageModule,
    ModalformulariocondicionPageModule,
    ModalformulariocalidadcondicionPageModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
