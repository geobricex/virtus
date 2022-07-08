import { Component } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  email: string;
  password: string;
  rol: string;

  constructor(public router: Router) {
  }

  login () {
    if(this.email === "admin" && this.password === "admin")
      this.rol = "A";
    else
      this.rol = "U"

    let user = new User(this.email, this.password, this.rol);
    console.log(user.email);
    this.router.navigateByUrl('/app');
  }

}
