import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    /*
    {
      title: 'Scan QR',
      url: '/home/scan',
      icon: 'qr-scanner'
    },
    {
      title: 'Crear Muestra',
      url: '/ingresarqr',
      icon: 'add'
    },
    {
      title: 'Lista de Muestras',
      url: '/listasmuestras',
      icon: 'list'
    },
    {
      title: 'Sync App',
      url: '/#!',
      icon: 'contract'
    },
    {
      title: 'Notificar Error',
      url: '/#!',
      icon: 'alert'
    },
    {
      title: 'Opciones',
      url: '/#!',
      icon: 'cog'
    },
    */
    /*
    {
      title: 'Cerrar Sesión',
      url: '/login',
      icon: 'power'
    },
    */
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe((state) => {
        console.log('Auth changed: ', state);
        if (state) {
          this.router.navigate(['members', 'home']);
          //this.router.navigate(['members', 'dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }

  logout () {
    this.authService.logout();
  }
}
