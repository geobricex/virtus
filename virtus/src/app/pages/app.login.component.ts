import {Component} from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  email: string;
  password: string;
  rol: string;

  forgotPassword_dialog: boolean;
  alreadyHasCode: boolean;

  constructor(public router: Router) {
    this.forgotPassword_dialog = false;
    this.alreadyHasCode = false;
  }

  openDialogHasCode() {
    this.forgotPassword_dialog = false;
    this.alreadyHasCode = true;
  }

  openDialogForgotPassword() {
    this.forgotPassword_dialog = true;
  }

  login() {
    if (this.email === "admin" && this.password === "admin")
      this.rol = "A";
    else
      this.rol = "U"

    let user = new User(this.email, this.password, this.rol);
    console.log(user.email);
    this.router.navigateByUrl('/app');
  }

}
