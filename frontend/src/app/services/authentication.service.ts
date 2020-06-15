import { UsuarioModel } from '../models/usuario.model';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'psKey';
const USER_KEY = 'usuarioKey';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  apiToken : string;
  usuario : UsuarioModel = new UsuarioModel;

  constructor(
    private router: Router, 
    private storage: Storage, 
    private plt: Platform) { 
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
      if (responses[1]) this.usuario = (JSON.parse(responses[1]) as UsuarioModel);
    })
  }

  login(token:string, usuario:any) {
    return Promise.all([this.storage.set(TOKEN_KEY, token), this.storage.set(USER_KEY, JSON.stringify(usuario))]);
  }
 
  logout() {
    return Promise.all([this.storage.remove(TOKEN_KEY), this.storage.remove(USER_KEY)]);
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
