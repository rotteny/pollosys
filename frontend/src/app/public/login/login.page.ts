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

  constructor(private router: Router) { 
    window.addEventListener('keyboardDidShow', (event) => {
        // Describe your logic which will be run each time when keyboard is about to be shown.
        alert('teste');
        console.log(event);
    });
  }

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
