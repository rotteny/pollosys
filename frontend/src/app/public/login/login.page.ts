import { User } from './../../models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() { }

  segmentChanged(event: any) {
    if(event.detail.value === "login") 
      this.slides.slidePrev();
    else
      this.slides.slideNext();
  }

  login() { 
    this.authService.login('123456', JSON.stringify({
                                                      id: 1, 
                                                      nome: "George Rotteny", 
                                                      email: "grotteny@hotmail.com", 
                                                      telefone: "11990209494", 
                                                      imagem_url: "/assets/img/cliente-logo.jpg", 
                                                      is_admin: 0, 
                                                      empresa_id: 1
                                                    }), '/private/home');
  }
  esqueciSenha() { 
    this.router.navigateByUrl('/private/home');
  }

}
