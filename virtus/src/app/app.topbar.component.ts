import {Component, Input, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {User} from './models/user';
import {StorageService} from "./authentication/StorageService";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

  public user: User;

  constructor(public app: AppMainComponent, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.user = this.storageService.getCurrentUser();
  }
}
