import { UsuarioModel } from '../../models/usuario.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WebService } from './../../services/web.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  
  public login = {
      email: 'admin@admin.com.br',
      senha: '123456'
    };

  constructor(
    private router: Router, 
    private alertCtrl: AlertController,
    private wbService: WebService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    if(event.detail.value === "login") 
      this.slides.slidePrev();
    else
      this.slides.slideNext();
  }

  submitLogin() { 
    this.wbService.presentLoading();
    this.wbService.postLogin(this.login.email, this.login.senha)
      .subscribe( response => {    
        var token = response['success']['token']
          , usuario = response['success']['usuario'];
        this.authService.login(token, usuario)
        .then(() => {
          this.authService.authenticationState.next(true);
          this.authService.apiToken = token;
          this.authService.usuario  = (usuario as UsuarioModel);
          this.router.navigateByUrl('private/home');
        });
        this.wbService.dismissLoading();
      } , response => {
        this.wbService.dismissLoading();
        if(response['error'] && response['error']['message']) this.wbService.messageAlertError(response['error']['message']);
        else this.wbService.messageAlertError("Falha interno do servidor.");
      });
  }

  submitSenha() { 
    this.router.navigateByUrl('/private/home');
  }

  async esqueciSenhaAlertForm() {
    let form = await this.alertCtrl.create({
      header: 'Esqueci minha senha',
      message: 'Informe o e-mail cadastrado para recuperar sua senha.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'E-mail'
        },
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: (data) => {
            if(!data.email) {
              this.wbService.messageAlertError("E-mail não informado.");
              return false;
            }
            this.wbService.presentLoading();
            this.wbService.postEsqueciSenha(data.email).subscribe( response => {    
              this.wbService.dismissLoading();
              form.dismiss();
            } , response => {
              this.wbService.dismissLoading();
              if(response['status'] == 404) this.wbService.messageAlertError("Indispónível.");
              else if(response['error'] && response['error']['error']) this.wbService.messageAlertError(response['error']['error']);
              else this.wbService.messageAlertError("Falha interno do servidor.");
            });
            return false;
          }
        }, {
          text: 'Calcelar',
          role: 'cancel'
        }
      ]
    });
    await form.present();
  }

}
