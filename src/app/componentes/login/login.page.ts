import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaravelPassportService } from 'laravel-passport';

import { NavController, LoadingController, NavParams } from "@ionic/angular";

import { Router } from '@angular/router';

//import { Http, Headers, RequestOptions /*Response*/ } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



// API REST.
import { cfsmBackendConfig } from '../../servicios/apirest/cfsm-backend-config';
import { authPassportConfig } from '../../servicios/authbasic/auth-passport-config';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales:FormGroup;
  datosUsuario:any = {
    'email':'prueba@mail.cl',
    'password':123456
  };

  url_base = authPassportConfig.url_base_qa;
  headers = new Headers(authPassportConfig.headers);
  options = new RequestOptions({ headers: this.headers });

  constructor(
    public afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public laravelPassportService: LaravelPassportService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public router: Router,
    public http: Http
  ){
    this.credenciales = this.formBuilder.group({
      email: ['prueba@mail.cl', Validators.required],
      password: ['123456', Validators.required]
    });
  }

  ngOnInit() {

    this.datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    if (this.datosUsuario) {
      this.credenciales.value.email = this.datosUsuario.email;
      this.credenciales.value.password = this.datosUsuario.password;
    }


  }

  public async login () {

    
    const credenciales = this.credenciales.value;
    this.laravelPassportService
      .loginWithEmailAndPassword(credenciales.email, credenciales.password)
      .subscribe(
        res => {
          //console.log(credenciales);
          console.log(res);
          localStorage.setItem('tokens', JSON.stringify(res));
          localStorage.setItem('datosUsuario', JSON.stringify(credenciales)); // Para la autenticacion cuando recupere la conexion
          this.router.navigate(['home']);
          

          //this.headers.append('Authorization', 'Basic ' + info.token);
          //this.http.post(`${this.url_base}/datosUsuario`, credenciales, this.options).subscribe( data => { console.log(data); } );

          /*
          let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'withCredentials': 'true',
            'Access-Control-Allow-Origin': '*',
          });
      
          this.options = new RequestOptions({ headers: this.headers });
      
          let self = this;
          this.http.post(`${this.url_base}/api/login`, credenciales, this.options ).subscribe( res => { 
            //self.muestras = res.json().muestras; 
            console.log(res);
          });
          */
      


        },
        err => {
          console.log(err);
        },
        ()=>{
          console.log('completed');
        }
      );


    
    // this.router.navigate(['home']);
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