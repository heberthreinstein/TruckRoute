import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route } from '../models/route.model';
import { AlertaService } from './alerta.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private afs: AngularFirestore,
    private alert: AlertaService) { }

  async save(route: Route){
      const loading = await this.alert.loading({message: 'Saving'})
      this.afs.collection('routes').add(Object.assign({}, route)).then( (res) => {
          this.alert.toast({message: 'Thank you for helping other drivers'});
          loading.dismiss();
        }).catch(error => alert('error saving route' + error));
    }

  getCityFromPlusCode(plus: string){
      return plus.substring(8);
  }
  getRoutesByLocationId(locationID: string): Observable<unknown[]>{
      return this.afs.collection('routes', r => r.where('locationID', '==', locationID)).valueChanges({idField: 'id'});
  }
  getRouteById(id: string){
      return this.afs.collection('routes').doc(id).get()
  }
}
