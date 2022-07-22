import {Injectable} from "@angular/core";
import {Router} from '@angular/router';
import {Session} from "../models/session";
import {User} from "../models/user";

@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession: Session;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session {
    var sessionStr: any;
    sessionStr = this.localStorageService.getItem('currentUser');
    return <Session>JSON.parse(sessionStr);
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession;
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return session.user;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : "";
  };

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
