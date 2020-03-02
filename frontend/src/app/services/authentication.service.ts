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
  user:User = new User;

  constructor(private router: Router, private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    Promise.all([this.storage.get(TOKEN_KEY),  this.storage.get(USER_KEY)]).then(responses => {
      if (responses[0]) this.authenticationState.next(true);
      if (responses[1]) this.user = new User(responses[1]);
    })
  }

  login(token:string, userJson:string, urlNavigate?:string) {
    return Promise.all([this.storage.set(TOKEN_KEY, 'Bearer 1234567'), this.storage.set(USER_KEY, userJson)]).then(responses => {
      console.log(responses);
      if(responses[0]) this.authenticationState.next(true);
      if(responses[1]) this.user = new User(userJson);
      if(urlNavigate) this.router.navigateByUrl(urlNavigate);
    });
  }
 
  logout(urlNavigate?:string) {
    return Promise.all([this.storage.remove(TOKEN_KEY), this.storage.remove(USER_KEY)]).then(responses => {
      if(!responses[0] && !responses[1]) {
        this.authenticationState.next(false);
        this.user = new User;
        if(urlNavigate) this.router.navigateByUrl(urlNavigate);
      }
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
