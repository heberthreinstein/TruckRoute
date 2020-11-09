import { Component, OnInit } from '@angular/core';
import  { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
