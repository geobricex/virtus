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
import {MessageService} from "primeng/api";

import {initializeApp} from "firebase/app";
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Parser} from "@angular/compiler";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {LoginServicie} from "./loginServicie";

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.css']
})
export class AppLoginComponent {

  user: User;
  sessionLog: Session;
  forgotPassword_dialog: boolean;
  alreadyHasCode: boolean;
  globalUri: string = "";
  frmLogin: FormGroup;

  constructor(
    public router: Router,
    private storageService: StorageService,
    private _http: HttpClient,
    private service: MessageService,
    public fAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private cookies: CookieService,
    private loginservicie: LoginServicie
  ) {
    this.forgotPassword_dialog = false;
    this.alreadyHasCode = false;
  }

  ngAfterViewInit() {
    console.clear();
  }

  /**
   * Metodo para inicializar cualquier cosa
   * */
  ngOnInit(): void {
    //this.storageService.logout();
    //localStorage.clear()
    //sessionStorage.clear()
    this.sessionLog = new Session("", new User("", "", "", "", "", ""));
    this.user = new User("", "", "", "", "", "");
    this.frmLogin = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get form() {
    return this.frmLogin.controls;
  }

  openDialogHasCode() {
    this.forgotPassword_dialog = false;
    this.alreadyHasCode = true;
  }

  openDialogForgotPassword() {
    this.forgotPassword_dialog = true;
  }

  login() {
    let data = {email: this.form["email"].value, password: this.form["password"].value};
    console.log(data);
    this.loginservicie.apiLogin(data.email, data.password).subscribe({
      next: response => {
        this.showMessages(response.status, response.information, "tst");
        if (response.status === 2) {
          let dataLogin = response.data[0];
          console.log(dataLogin.user_token);
          this.loginservicie.setToken(dataLogin.user_token);
          this.router.navigateByUrl('/app');
        }
      }
    })
    /* this.sessionLog = new Session("", new User("", "", "", "", "", ""));
     this.storageService.setCurrentSession(this.sessionLog);

     this.apiLogin().subscribe(response => {
       console.log(response);
       this.sessionLog = new Session("", new User("", "", "", "", "", ""));
       console.log("ANTES DE INGRESAR: ", this.sessionLog);
       this.storageService.setCurrentSession(this.sessionLog);
       this.showMessages(response.status, response.information, "tst");
       if (response.status === 2) {
         let dataLogin = response.data[0];
         this.user = new User(dataLogin.email_person, dataLogin.type_person, dataLogin.name_person,
           dataLogin.lastname_person, dataLogin.pathimg_person, dataLogin.provider_person);
         this.sessionLog = new Session(dataLogin.user_token, this.user);
         this.storageService.setCurrentSession(this.sessionLog);
         console.log(this.sessionLog);
         this.router.navigateByUrl('/app');
         //location.reload();
       }
     });*/
  }

  recoverAccount() {
    this.apiRecoverAccount().subscribe(response => {
      console.log(response);
      this.showMessages(response.status, response.information, "tst");
    });
  }

  apiRecoverAccount(): Observable<any> {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      this.globalUri = "virtusbk/persons/requestcode";
    } else {
      this.globalUri = "virtus_bk/persons/requestcode";
    }
    return this._http.post<Person>(this.globalUri, {
      "flag": "2",
      "email": this.user.email,
      "code": ""
    });
  }

  showMessages(status: number, info: string, key: string) {
    this.service.add({
      key: key,
      severity: status === 1 ? "warn" : status === 2 ? "success" : status === 3 ? "error" : "info",
      summary: 'Virtus',
      detail: info
    });
  }

  loginWithFacebook(): void {
    console.log("iniciame con facebook");
    this.iniciarSesion(new auth.FacebookAuthProvider());
  }

  loginWithGoogle(): void {
    console.log("iniciame con google");
    this.iniciarSesion(new auth.GoogleAuthProvider());
  }

  iniciarSesion(provider: any): void {
    this.fAuth.signInWithPopup(provider).then((result: UserCredential) => {
      let userinfo = result.additionalUserInfo;
      let userprofile = userinfo!.profile;

      let datosUser = {
        isNewUser: userinfo!.isNewUser,
        provider: userinfo!.providerId,
        // @ts-ignore
        userid: String(userinfo!.profile!.id),
        userimage: "",
        useremail: "",
        username: "",
        userlastname: "",
      };
      console.log(userinfo);
      switch (userinfo!.providerId) {
        case "google.com": {
          // @ts-ignore
          datosUser['userimage'] = userprofile!.picture;
          // @ts-ignore
          datosUser['useremail'] = userprofile!.email;
          // @ts-ignore
          datosUser['username'] = userprofile!.given_name;
          // @ts-ignore
          datosUser['userlastname'] = userprofile!.family_name;
        }
          break;
        case "facebook.com": {
          // @ts-ignore
          datosUser['userimage'] = ("https://graph.facebook.com/" + userprofile.id + "/picture?type=large&amp;width=1080");
          // @ts-ignore
          datosUser['useremail'] = userprofile.email;
          // @ts-ignore
          datosUser['username'] = userprofile.first_name;
          // @ts-ignore
          datosUser['userlastname'] = userprofile.last_name;
        }
          break;
        default:
          break;
      }
      if (datosUser['userlastname'] === undefined) {
        // @ts-ignore
        let {username, ...datos} = datosUser;
        // @ts-ignore
        username = this.operarnombre(username) as JSON;//dividir el name de forma pro
        // @ts-ignore
        datosUser = {...datos, ...username};//juntar ambos json en uno solo :3
      }
      console.log("usuario logeado [linea 204]:", datosUser);
      this.apiRegisterGoogle(datosUser).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === 2) {
            let dataLogin = response.data[0];
            console.log(dataLogin.user_token);
            this.loginservicie.setToken(dataLogin.user_token);
            this.router.navigateByUrl('/app');
          }
        },
        error: (error: any) => {

        }
      })
    }).catch(function (error) {
      console.log("error", error)
      /*swalDelay({
        status: 4,
        tittle: "Service provider error!",
        information: error.message
      });*/
    });
    this.showMessages(4, "Service provider error!", "");
  }

  apiRegisterGoogle(data: any): Observable<any> {

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      this.globalUri = "virtus_bk/";
    } else {
      this.globalUri = "virtus_bk/";
    }

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('provider', 'native')
      .set('provider', data.provider);

    this.globalUri = this.globalUri + "persons/loginoauth";
    return this._http.post<any>(this.globalUri,
      {
        "useremail": data.useremail,
        "username": data.username,
        "userlastname": data.userlastname,
        "userid": data.userid,
        "userimage": data.userimage
      }, {headers: headers});
  }

  operarnombre(paramName: string): any {
    let partes = paramName.toString().trim().split(" ");
    let obj = {
      username: '',
      userlastname: ''
    };
    let limit: number = parseInt((partes.length / 2).toFixed(0), 10);
    for (let ind = 0; ind < partes.length; ind++) {
      let minpart = partes[ind];
      if (minpart.length > 0) {
        if (ind < limit) {
          obj['username'] = obj['username'].length > 0 ? " " : "" + minpart;
        } else {
          obj['userlastname'] = obj['userlastname'].length > 0 ? " " : "" + minpart;
        }
      }
    }
    return obj;
  }

}
