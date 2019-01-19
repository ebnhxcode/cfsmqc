import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController, LoadingController, NavParams } from "@ionic/angular";

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales:FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public router: Router
  ){
    this.credenciales = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public async login () {
    this.router.navigate(['home']);

    /*
    * En la prox. refact. se debe validar que el usuario tenga acceso a internet sino para buscar en la base local
    
    const  { usuario , clave } = this 
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(usuario, clave);
    } catch ( err ) {
      console.dir(err);
      if (err.code === 'auth/user-not-found') {
        console.log("Usuario no encontrado");
      }
    }
    */
  }

  public irRegistrar () {
    this.navCtrl.navigateForward('/registro');
  }

  public resetearClave () {
    return 0;
  }



}