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

  login = {
    email: 'grotteny@hotmail.com',
    senha: '123456789'
  }

  constructor(
    private router: Router, 
    private wbService: WebService,
    ) { }

  ngOnInit() { }

  segmentChanged(event: any) {
    if(event.detail.value === "login") 
      this.slides.slidePrev();
    else
      this.slides.slideNext();
  }

  submitLogin() { 
    this.wbService.postLogin(this.login.email, this.login.senha, '/private/home');
  }

  submitSenha() { 
    this.router.navigateByUrl('/private/home');
  }

}
