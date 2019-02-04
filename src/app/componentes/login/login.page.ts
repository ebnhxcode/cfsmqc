import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

// Forms, remember register ReactiveForms in class module
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LaravelPassportService } from 'laravel-passport';

import { NavController, LoadingController, NavParams, AlertController, ToastController, MenuController, Platform } from "@ionic/angular";

import { Router } from '@angular/router';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private credenciales:FormGroup;
  private loading:any;
  private toast:any;
  private alert:any;

  private error_messages = {
    'email': [
      { type: 'required', message: 'Email requerido' },
      { type: 'minlength', message: 'El email debe ser mayor a 6 caracteres' },
      { type: 'maxlength', message: 'El email debe ser menor a 50 caracteres' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ],
    'password': [
      { type: 'required', message: 'Clave requerida' },
      { type: 'minlength', message: 'La clave debe ser mayor a 6 caracteres' },
      { type: 'maxlength', message: 'La clave debe ser menor a 50 caracteres' },
      { type: 'pattern', message: 'Ingrese una clave válida' }
    ],
  }


  constructor(
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private laravelPassportService: LaravelPassportService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private platform: Platform,
    private router: Router
  ){
    //this.menuCtrl.enable(false, 'MenuCfsmqc');
    this.menuCtrl.enable(false);

    let credencialesUsuario = JSON.parse(localStorage.getItem('credencialesUsuario'));

    // Validadores de mis imputs
    this.credenciales = this.formBuilder.group({ 
      password: new FormControl(credencialesUsuario?credencialesUsuario.password:'', Validators.compose([ //123456
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ])),
      email:  new FormControl(credencialesUsuario?credencialesUsuario.email:'', Validators.compose([ //prueba@mail.cl
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])), 
    });


    // Si no hay conexion, que checkee si en localstorage tiene datos para iniciar la sesion local
    // Si no hay conexion y ademas no tiene datos, debe tener conexion a internet para validar al usuario
    // Si hay conexion, que autologuee si tiene datos en localstorage
    // Si hay conexion, si es primera vez que inicia sesion hace login y guarda los datos en localstorage

    
    if (!credencialesUsuario) {
      let toast = this.toastCtrl.create({
        message: 'No se encontraron datos para auto inicio de sesión, debes iniciar sesión para validar tus datos.',
        duration: 5000,
        position: 'bottom'
      });
      toast.then( toast => toast.present());
    } else {
      this.login();
    }

    /*
    // Para que cachee los datos del usuario

    */
  }






  
  ngOnInit() {}

  private async presentLogin () { 
    this.loading = await this.loadingCtrl.create({
      message: 'Espere un momento por favor',
      spinner: 'crescent',
      //duration: 2000
    });
    return await this.loading.present();
  }

  private async presentAutoLogin () { 
    this.loading = await this.loadingCtrl.create({
      message: 'Auto Inicio de sesión, validando credenciales',
      spinner: 'crescent',
    });
    return await this.loading.present();
  }

  private async autoLogin (credencialesUsuario) {
    this.presentAutoLogin();

    this.laravelPassportService
      .loginWithEmailAndPassword(credencialesUsuario.email, credencialesUsuario.password)
      .subscribe(
        res => {
          this.loading.dismiss();
          localStorage.setItem('tokens', JSON.stringify(res));
          localStorage.setItem('credencialesUsuario', JSON.stringify(credencialesUsuario)); // Para la autenticacion cuando recupere la conexion
          this.router.navigate(['home']);
        },
        err => { console.log(err); },
        ()=>{}
      );

  }

  public async login () {

    let credencialesUsuario = JSON.parse(localStorage.getItem('credencialesUsuario'));

    console.log(this.apiService.checkearConexionOnlineAplicacion());
    if ( this.apiService.checkearConexionOnlineAplicacion() === true ) {

      
      if (credencialesUsuario) {
        // Checkea si existen datos de usuario en local storage e inicia sesion con esos datos
        this.autoLogin(credencialesUsuario);
      } else {
        this.presentLogin();
        const credenciales = this.credenciales.value;
        this.laravelPassportService
          .loginWithEmailAndPassword(credenciales.email, credenciales.password)
          .subscribe(
            res => {
              this.loading.dismiss();
              localStorage.setItem('tokens', JSON.stringify(res));
              localStorage.setItem('credencialesUsuario', JSON.stringify(credenciales)); // Para la autenticacion cuando recupere la conexion
              this.router.navigate(['home']);
              //this.headers.append('Authorization', 'Basic ' + info.token);
              //this.http.post(`${this.url_base}/datosUsuario`, credenciales, this.options).subscribe( data => { console.log(data); } );
              
            },
            err => { console.log(err); },
            ()=>{}
          );
      }
    } else {
      if (credencialesUsuario) {
        if (this.credenciales.value.email == credencialesUsuario.email && 
          this.credenciales.value.password == credencialesUsuario.password) {
            let toast = this.toastCtrl.create({
              message: 'Iniciando sesión modo offline.',
              duration: 4000,
              position: 'bottom'
            });
            toast.then( toast => toast.present());
            // Checkea si existen datos de usuario en local storage e inicia sesion con esos datos
            this.router.navigate(['home']);
        }

      } else {
        let toast = this.toastCtrl.create({
          message: 'Te debes conectar a internet para validar tus datos.',
          duration: 5000,
          position: 'bottom'
        });
        toast.then( toast => toast.present());
      }

    }

    /*
    this.presentLogin();
    const credenciales = this.credenciales.value;
    this.laravelPassportService
      .loginWithEmailAndPassword(credenciales.email, credenciales.password)
      .subscribe(
        res => {
          this.loading.dismiss();
          localStorage.setItem('tokens', JSON.stringify(res));
          localStorage.setItem('credencialesUsuario', JSON.stringify(credenciales)); // Para la autenticacion cuando recupere la conexion
          this.router.navigate(['home']);
          //this.headers.append('Authorization', 'Basic ' + info.token);
          //this.http.post(`${this.url_base}/datosUsuario`, credenciales, this.options).subscribe( data => { console.log(data); } );
          
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
          
        },
        err => { console.log(err); },
        ()=>{}
      );
      
      */
  }

  public irRegistrar () {
    this.navCtrl.navigateForward('/registro');
  }

  public resetearClave () {
    return 0;
  }



}