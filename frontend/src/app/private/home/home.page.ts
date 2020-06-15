import { WebService } from 'src/app/services/web.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  logoDefault:string = "assets/img/pollosys-logo.png";

  logo:string;
  
  constructor(private authService: AuthenticationService, private wbService: WebService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.authService.usuario.empresa.imagem_url) this.logo = this.wbService.baseUrl + this.authService.usuario.empresa.imagem_url;
    else this.logo = this.logoDefault;
  }
}
