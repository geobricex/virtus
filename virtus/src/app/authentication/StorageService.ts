import {Injectable} from "@angular/core";
import {Router} from '@angular/router';
import {Session} from "../models/session";
import {User} from "../models/user";
import {any} from "codelyzer/util/function";

@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession: Session;

  constructor(private router: Router) {
    this.localStorageService = sessionStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: any): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session {
    var sessionStr: any;
    var sessionAux: Session;
    sessionStr = this.localStorageService.getItem('currentUser');
    sessionAux = <Session>JSON.parse(sessionStr);
    return sessionAux;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession;
  }

  getCurrentUser(): User {
    var session: any = this.getCurrentSession();
    var currentUser: User;
    if (session !== null) {
      currentUser = new User(session._user._email, session._user._type_person, session._user._name_person,
        session._user._last_name, session._user._pathimg_person, session._user._provider_person);
    }
    // @ts-ignore
    return currentUser;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() !== null);
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : "";
  };

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
    location.reload();
  }

}
