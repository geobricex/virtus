import {Component} from '@angular/core';
import {User} from '../models/user';
import {Session} from '../models/session';
import {Router} from '@angular/router';
import {StorageService} from "../authentication/StorageService";
import {Utils} from "../util/Utils";
// web servicies cliet
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  user: User;
  sessionLog: Session;
  forgotPassword_dialog: boolean;
  alreadyHasCode: boolean;
  client: any;
  globalUri: string = "";

  constructor(
    public router: Router,
    private storageService: StorageService,
    private utils: Utils,
    private _http: HttpClient
  ) {
    this.forgotPassword_dialog = false;
    this.alreadyHasCode = false;
  }

  /**
   * Metodo para inicializar cualquier cosa
   * */
  ngOnInit(): void {
    this.user = new User("", "", "");
    this.client = new PocketBase(this.globalUri);
  }

  initPocket(): Observable<any> {
    return this.client.Admins.authViaEmail("anthony.pachay2017@uteq.edu.ec", "Abc1234567");
  }

  openDialogHasCode() {
    this.forgotPassword_dialog = false;
    this.alreadyHasCode = true;
  }

  openDialogForgotPassword() {
    this.forgotPassword_dialog = true;
  }

  login() {
    console.log(this.apiLogin().subscribe(response => console.log(response)));
  }

  apiLogin(): Observable<any> {
    console.log(this.user.email, this.user.password);
    this.globalUri = "virtusbk/persons/login";
    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native');
    return this._http.post(this.globalUri, {
      "email": this.user.email,
      "password": this.user.password
    }, {'headers': headers});
    /*if (this.user.email === "root" && this.user.password === "root") {
      this.user.rol = "R";
      this.sessionLog = new Session("123456", this.user);
      this.storageService.setCurrentSession(this.sessionLog);
      this.router.navigateByUrl('/app');
    } else if (this.user.email === "root" && this.user.password === "admin") {
      this.user.rol = "A";
      this.sessionLog = new Session("123456", this.user);
      this.storageService.setCurrentSession(this.sessionLog);
      this.router.navigateByUrl('/app');
    } else if (this.user.email === "root" && this.user.password === "user") {
      this.user.rol = "U";
      this.sessionLog = new Session("123456", this.user);
      this.storageService.setCurrentSession(this.sessionLog);
      this.router.navigateByUrl('/app');
    } else {
      this.utils.showMessages("1", "El usuario no se encuentra registrado/los campos son inválidos.", "tst");
    }*/

  }

}
