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

  save(route: Route){
      console.log('save in service', route)
      this.afs.collection('routes').add(Object.assign({}, route)).then( (res) => {
          this.alert.toast({message: 'Thank you for helping other drivers'});
          console.log(res)
        }).catch(error => console.log('error saving route',error));
    }

  getCityFromPlusCode(plus: string){
      return plus.substring(8);
  }
  getRoutesByLocationId(locationID: string): Observable<unknown[]>{
      return this.afs.collection('routes', r => r.where('locationID', '==', locationID)).valueChanges();
  }
}
