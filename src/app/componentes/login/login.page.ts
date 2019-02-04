import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

// Forms, remember register ReactiveForms in class module
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LaravelPassportService } from 'laravel-passport';

import { NavController, LoadingController, NavParams, AlertController, MenuController } from "@ionic/angular";

import { Router } from '@angular/router';

// Network 
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private credenciales:FormGroup;
  private loading:any;
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
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private network: Network,
    private router: Router
  ){
    //this.menuCtrl.enable(false, 'MenuCfsmqc');
    this.menuCtrl.enable(false);

    // Validadores de mis imputs
    this.credenciales = this.formBuilder.group({ 
      password: new FormControl('', Validators.compose([ //123456
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ])),
      email:  new FormControl('', Validators.compose([ //prueba@mail.cl
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





    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      alert('network was disconnected :-(');
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      alert('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
          alert('we got a wifi connection, woohoo!');
        }
        if (this.network.type === '3g') {
          console.log('we got a 3g connection, woohoo!');
          alert('we got a 3g connection, woohoo!');
        }
      }, 3000);
    });







    // Para que cachee los datos del usuario
    let credencialesUsuario = JSON.parse(localStorage.getItem('credencialesUsuario'));
    if (credencialesUsuario) {
      // Checkea si existen datos de usuario en local storage e inicia sesion con esos datos
      this.credenciales.value.email = credencialesUsuario.email;
      this.credenciales.value.password = credencialesUsuario.password;
      //this.autoLogin(credencialesUsuario);
    }
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
        err => { console.log(err); },
        ()=>{}
      );
  }

  public irRegistrar () {
    this.navCtrl.navigateForward('/registro');
  }

  public resetearClave () {
    return 0;
  }



}