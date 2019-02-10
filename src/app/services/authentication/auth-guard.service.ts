import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthenticationService
  ) {


  }

  /**
   * Retorna si el usuario esta logueado o no
   */
  canActivate (): boolean {
    return this.authService.isAuthenticated();
  }





}
