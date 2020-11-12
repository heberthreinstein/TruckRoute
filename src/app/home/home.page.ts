import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: Observable<User>;
  constructor(private router: Router, private auth: AuthService) {
          this.user = auth.user$;
  }


  newRoute(){
      this.router.navigate(['new-route']);
  }
  goToProfile(){
      this.router.navigate(['user-profile']);
  }
}
