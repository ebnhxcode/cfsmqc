import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: string = "";
  clave: string = "";
  rclave: string = "";

  constructor(public afAuth: AngularFireAuth) { 

  }

  ngOnInit() {
  }

  async registrar () {
    const { usuario, rclave, clave } = this
    if (clave !== rclave) {
      return console.error('Las claves no coinciden');
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(usuario, rclave);
      console.log(res);
    } catch (err) {
      console.dir(err);
    }
  }

}
