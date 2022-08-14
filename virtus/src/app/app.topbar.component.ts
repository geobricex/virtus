import {Component, Input, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {User} from './models/user';
import {StorageService} from "./authentication/StorageService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

  public user: User;

  constructor(public app: AppMainComponent, private storageService: StorageService, public router: Router) {
  }

  ngOnInit(): void {
    this.user = this.storageService.getCurrentUser();
    if (this.user === undefined) {
      this.router.navigateByUrl('/login');
      return;
    }
  }

  logout() {
    this.storageService.logout();
  }

  display: boolean = false;

  showDialog() {
    this.display = true;
  }
}
