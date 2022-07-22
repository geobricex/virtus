import {Component} from '@angular/core';
import {User} from '../models/user';
import {Session} from '../models/session';
import {Router} from '@angular/router';
import {StorageService} from "../authentication/StorageService";
import {Utils} from "../util/Utils";

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  email: string;
  password: string;
  rol: string;

  userLog: User;
  sessionLog: Session;

  forgotPassword_dialog: boolean;
  alreadyHasCode: boolean;

  constructor(public router: Router, private storageService: StorageService, private utils: Utils) {
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

    if (this.email === "root" && this.password === "root") {
      this.rol = "R";
      this.userLog = new User(this.email, this.password, this.rol);
      this.sessionLog = new Session("123456", this.userLog);
      this.storageService.setCurrentSession(this.sessionLog);
      this.router.navigateByUrl('/app');
    } else if (this.email === "admin" && this.password === "admin") {
      this.rol = "A";
      this.userLog = new User(this.email, this.password, this.rol);
      this.sessionLog = new Session("123456", this.userLog);
      this.storageService.setCurrentSession(this.sessionLog);
      this.router.navigateByUrl('/app');
    } else if (this.email === "user" && this.password === "user") {
      this.rol = "U";
      this.userLog = new User(this.email, this.password, this.rol);
      this.sessionLog = new Session("123456", this.userLog);
      this.storageService.setCurrentSession(this.sessionLog);
      this.router.navigateByUrl('/app');
    } else {
      this.utils.showMessages("1", "El usuario no se encuentra registrado/los campos son inválidos.", "tst");
    }

  }

}
