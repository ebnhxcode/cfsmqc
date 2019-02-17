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

  /**
   * 
   * @param storage 
   * @param platform 
   */
  constructor(
    private storage: Storage,
    private platform: Platform
  ) { 
    this.platform.ready().then(()=>{
      this.checkToken();
    });
  }

  /**
   * Inicia sesion guardando el token y 
   * hace que variable local de estado de auth. cambie a true y permita seguir con el inicio de sesion
   */
  login () {
    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
      this.authenticationState.next(true);
    });
  }


  /**
   * Cierra la sesion y elimina el token almacenado
   */
  logout () {
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authenticationState.next(false);
    });
  }


  /**
   * Checkea y retorna el estado de la autenticacion
   * @return boolean
   */
  isAuthenticated () {
    return this.authenticationState.value;
  }

  /**
   * Checkea si existe el token del usuario en sesion y permite continuar
   */
  checkToken () {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }



}
