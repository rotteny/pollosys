import { User } from './../models/user';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'psKey';
const USER_KEY = 'userKey';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  apiToken:string;
  user:User = new User;

  constructor(private router: Router, private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    Promise.all([this.storage.get(TOKEN_KEY),  this.storage.get(USER_KEY)]).then(responses => {
      if (responses[0]) {
        this.apiToken = responses[0];
        this.authenticationState.next(true);
      }
      if (responses[1]) this.user = new User(responses[1]);
    })
  }

  login(token:string, user:any, urlNavigate?:string) {
    return Promise.all([this.storage.set(TOKEN_KEY, token), this.storage.set(USER_KEY, JSON.stringify(user))]).then(() => {
      this.authenticationState.next(true);
      this.apiToken = token;
      this.user = new User(user);
      if(urlNavigate) this.router.navigateByUrl(urlNavigate);
    });
  }
 
  logout(urlNavigate?:string) {
    return Promise.all([this.storage.remove(TOKEN_KEY), this.storage.remove(USER_KEY)]).then(responses => {
      if(!responses[0] && !responses[1]) {
        this.authenticationState.next(false);
        this.apiToken = null;
        this.user = new User;
        if(urlNavigate) this.router.navigateByUrl(urlNavigate);
      }
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
