import {Component, Input, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {User} from './models/user';
import {StorageService} from "./authentication/StorageService";
import {Router} from "@angular/router";
import {Utils} from "./util/Utils";
import {LoginServicie} from "./pages/loginServicie";
import {PersonInterface} from "./models/PersonInterface";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

  public person: PersonInterface;

  constructor(public app: AppMainComponent, private storageService: StorageService, public router: Router, private utils: Utils,
              private loginservicie: LoginServicie) {
  }

  ngOnInit(): void {
    this.loginservicie.getDataPerson(this.loginservicie.getToken()).subscribe({
      next: response => {
        //console.log(response);
        this.person = response;
        if (this.person === null) {
          this.router.navigateByUrl('/login');
          return;
        }
      }
    });
  }

  logout() {
    this.loginservicie.deleteToken();
    this.router.navigate(['/login']);
    //location.reload();
  }

  display: boolean = false;

  showDialog() {
    this.display = true;
  }
}
