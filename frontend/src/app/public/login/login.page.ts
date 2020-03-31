import { Usuario } from './../../models/usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WebService } from './../../services/web.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
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
          this.authService.usuario  = (usuario as Usuario);
          this.router.navigateByUrl('private/home');
        });
      } , response => {
        if(response['error'] && response['error']['message']) this.wbService.messageAlertError(response['error']['message']);
        else this.wbService.messageAlertError("Falha interno do servidor.");
      } , () => {
        this.wbService.dismissLoading();
      });
  }

  submitSenha() { 
    this.router.navigateByUrl('/private/home');
  }

}
