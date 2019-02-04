import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';

/**
 * Estructura de dato que compone los estados de una conexión
 * Online
 * Offline
 */
export enum ConnectionStatus {
   Online,
   Offline
}

@Injectable({
   providedIn: 'root'
})

export class NetworkService {

   /**
    * Instancia de variable que informa los estados y comportamientos en base a los eventos
    */
   private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

   constructor (
      private network: Network,
      private toastCtrl: ToastController,
      private platform: Platform
   ) {
      /**
       * Checkeo si la app está lista
       */
      this.platform.ready().then( () => {
         this.initializeNetworkEvents();
         let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
         this.status.next(status);
      });
   }

   /**
    * Metodo que suscribe los estados al desconectar y conectar internet de la app
    */
   public initializeNetworkEvents () {

      this.network.onDisconnect().subscribe( () => {
         if (this.status.getValue() === ConnectionStatus.Online) {
            console.log('We are offline');
            let toast = this.toastCtrl.create({
               message: `Te has desconectado, habilitando modo Offline`,
               duration: 3000,
               position: 'bottom'
            });
            toast.then(toast => toast.present());
            //alert('We are offline');
            this.updateNetworkStatus(ConnectionStatus.Offline);
         }
      });

      this.network.onConnect().subscribe( () => {
         if (this.status.getValue() === ConnectionStatus.Offline) {
            console.log('We are online');
            let toast = this.toastCtrl.create({
               message: `Ahora estás conectado, habilitando modo Online`,
               duration: 3000,
               position: 'bottom'
            });
            toast.then(toast => toast.present());
            //alert('We are online');
            this.updateNetworkStatus(ConnectionStatus.Online);
         }
      });
   }

   /**
    * Funcion que me permite actualizar el estado de la conexión
    * Muestra mensaje sobre el estado
    */
   private async updateNetworkStatus (status: ConnectionStatus) {
      this.status.next(status);
      let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
      let toast = this.toastCtrl.create({
         message: `Ahora estás ${connection}`,
         duration: 3000,
         position: 'bottom'
      });
      toast.then(toast => toast.present());
   }
   
   /**
    * Detecta si la conexcion cambió y actualiza variable de estado
    */
   public onNetworkChange(): Observable<ConnectionStatus> {
      return this.status.asObservable();
   }

   /**
    * Funcion que retorna el estado de la conexión
    */
   public getCurrentNetworkStatus(): ConnectionStatus {
      return this.status.getValue();
   }

}