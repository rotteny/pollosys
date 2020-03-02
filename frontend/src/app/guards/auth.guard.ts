import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, public auth: AuthenticationService, private toastCtrl: ToastController) {}
 
  canActivate(): boolean {
    if(!this.auth.isAuthenticated()) {
      this.router.navigateByUrl("/login");
      this.presentToast("Você precisa estar logado para acessar este conteúdo");
      return false;
    }
    
    return true;
  }

  async presentToast(menssage:string) {
    const toast = await this.toastCtrl.create({
      message: menssage,
      position: 'middle',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }
  
}
