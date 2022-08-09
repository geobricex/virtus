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
import {Person} from "../models/Person";

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
    this.user = new User("", "", "", "", "", "");
    this.client = new PocketBase(this.globalUri);
  }


  openDialogHasCode() {
    this.forgotPassword_dialog = false;
    this.alreadyHasCode = true;
  }

  openDialogForgotPassword() {
    this.forgotPassword_dialog = true;
  }

  login() {
    this.apiLogin().subscribe(response => {
      console.log(response);
      this.utils.showMessages(response.status, response.information, "tst");
      if (response.status === 2) {
        let dataLogin = response.data[0];
        this.user = new User(dataLogin.email_person, dataLogin.type_person, dataLogin.name_person,
          dataLogin.lastname_person, dataLogin.pathimg_person, dataLogin.provider_person);
        this.sessionLog = new Session(dataLogin.user_token, this.user);
        this.storageService.setCurrentSession(this.sessionLog);
        console.log(this.sessionLog);
        this.router.navigateByUrl('/app');
      }
    });
  }


  apiLogin(): Observable<any> {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      this.globalUri = "virtusbk/persons/login";
    }else{
      this.globalUri = "virtus_bk/persons/login";
    }
    console.log(this.user.email, this.user.password);

    var headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native');
    return this._http.post(this.globalUri, {
      "email": this.user.email,
      "password": this.user.password,
      "provider": "native"
    }, {'headers': headers});
  }

  recoverAccount() {
    this.apiRecoverAccount().subscribe(response => {
      console.log(response);
      this.utils.showMessages(response.status, response.information, "tst");
    });
  }

  apiRecoverAccount(): Observable<any> {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      this.globalUri = "virtusbk/persons/requestcode";
    }else{
      this.globalUri = "virtus_bk/persons/requestcode";
    }
    return this._http.post<Person>(this.globalUri, {
      "flag": "2",
      "email": this.user.email,
      "code": ""
    });
  }

}
