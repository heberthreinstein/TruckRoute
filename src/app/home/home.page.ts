import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { RouteService } from '../services/route.service';
import { AlertaService } from '../services/alerta.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: Observable<User>;
  routes;
  constructor(private router: Router, private auth: AuthService, private routeService: RouteService, private alert: AlertaService) {
          this.user = auth.user$;
  }

  newRoute(){
      this.router.navigate(['new-route']);
  }
  goToProfile(){
      this.router.navigate(['user-profile']);
  }
  async getEstablishmentAddress(place) {
    const loading = await this.alert.loading()
    if (place.length == 0) {
      return;
    }
    this.routes = this.routeService.getRoutesByLocationId(place.place_id);
    this.routes.subscribe(res => {if (res) loading.dismiss()})
  }
}
