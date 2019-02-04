import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { OfflineManagerService } from '../offlineManager/offline-manager.service';
import { NetworkService, ConnectionStatus } from '../network/network.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';

const API_STORAGE_KEY = 'specialkey';
const API_URL = 'https://cfsmqcpreprod.publicidadorigen.cl';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
     private storage: Storage,
     private http: HttpClient,
     private networkService: NetworkService,
     private offlineManagerService: OfflineManagerService
  ) { 

  }


  obtenerMuestras (forceRefresh: boolean = false): Observable<any> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      return from(this.getLocalData('muestras'));
    } else {
      let page = Math.floor(Math.random() * Math.floor(6));

      return this.http.get(`${API_URL}/mobile/muestras`).pipe(
        map(res => res['data']),
        tap(res => {
          console.log('returns real live API data');
          this.setLocalData('muestras', res);
        })
      );

    }
  }

  actualizarMuestra (muestra, data): Observable<any> {
    let url = `${API_URL}/mobile/muestras/store`;
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.offlineManagerService.storeRequest(url, 'POST', data));
    } else {
      return this.http.post(url, data).pipe(
        catchError(err => {
            this.offlineManagerService.storeRequest(url, 'POST', data);
            throw new Error(err);
        })
      );
    }
  }

  // Save result of API request
  private setLocalData (key ,data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  // Get cached API result
  private getLocalData (key) {
    console.log('return local data!');
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
    
  }

}
