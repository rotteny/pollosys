import { Usuario } from './../../models/usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WebService } from './../../services/web.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;

  public loading;

  public login = {
      email: 'admin@admin.com.br',
      senha: '123456'
    };

  constructor(
    private router: Router, 
    private wbService: WebService,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() { }

  private async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      showBackdrop: true,
      message: 'Aguarde ...',
    });
    this.loading.present();
  }

  segmentChanged(event: any) {
    if(event.detail.value === "login") 
      this.slides.slidePrev();
    else
      this.slides.slideNext();
  }

  private async messageAlertError(message:string) {
    let error = await this.alertCtrl.create({
      header: 'Erro!',
      message: message,
      buttons: ['Cancelar']
    });
    error.present();
  }

  submitLogin() { 
    this.presentLoading();
    this.wbService.postLogin(this.login.email, this.login.senha)
      .subscribe( data => {    
        var token = data['success']['token']
          , usuario = data['success']['usuario'];
        this.authService.login(token, usuario)
        .then(() => {
          this.authService.authenticationState.next(true);
          this.authService.apiToken = token;
          this.authService.usuario  = (usuario as Usuario);
          this.router.navigateByUrl('private/home');
        });
      } , error => {
        if(error['error'] && error['error']['message']) this.messageAlertError(error['error']['message']);
        else this.messageAlertError("Falha interno do servidor.");
      })
      .add(() => {
        this.loading.dismiss();
      });
  }

  submitSenha() { 
    this.router.navigateByUrl('/private/home');
  }

}
