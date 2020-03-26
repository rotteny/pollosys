import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  logoDefault:string = "/assets/img/pollosys-logo.png";

  logo:string;
  
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.authService.usuario.empresa.imagem_url) this.logo = this.authService.usuario.empresa.imagem_url;
    else this.logo = this.logoDefault;
  }
}
