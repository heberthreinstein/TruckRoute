import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private auth: AuthService) {}


  newRoute(){
      this.router.navigate(['new-route'])
  }
  goToProfile(){
      this.router.navigate(['user-profile'])
  }
}
