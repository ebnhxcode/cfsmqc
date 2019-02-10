import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';
const DEBUG:boolean = true;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * Inicializa en falso dado que al comienzo el usuario no esta conectado
   */
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private platform: Platform
  ) { 
    this.platform.ready().then(()=>{
      this.checkToken();
    });
  }


  login () {
    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
      this.authenticationState.next(true);
    });
  }



  logout () {
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authenticationState.next(false);
    });
  }


  isAuthenticated () {
    return this.authenticationState.value;
  }


  checkToken () {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }



}
