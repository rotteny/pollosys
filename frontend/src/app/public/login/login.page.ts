import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;

  constructor(public keyboard: Keyboard, private router: Router) { }

  ngOnInit() { }

  segmentChanged(event: any) {
    if(event.detail.value === "login") 
      this.slides.slidePrev();
    else
      this.slides.slideNext();
  }

  login() { 
    this.router.navigateByUrl('/menu/home');
  }
  esqueciSenha() { 
    this.router.navigateByUrl('/menu/home');
  }
}
