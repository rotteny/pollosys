import { User } from './../models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  url = 'http://localhost:8000/api/v1/';

  loading;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) { }

  private async presentLoading(): Promise<any> {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde ...',
    });
    return await this.loading.present();
  }
  
  postLogin(email:string, password:string, redirect?:string) {
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    this.presentLoading();

    return this.http.post(this.url + "login", {email: email, senha: password}, {headers: headers})
      .subscribe((data)=>{    
        data = data['success'];
        this.authService.login(data['token'], data['user'], redirect);
      } , (err) => {
        if(err['error'] && err['error']['message']) alert(err['error']['message']);
        else alert("Falha interno do servidor.");
      })
      .add(() => {
        this.loading.dismiss();
      });
  }

  getClientes() {
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append("Authorization", 'Bearer ' + this.authService.apiToken);

    this.presentLoading();

    return this.http.get(this.url + "clientes", {headers: headers})
      .subscribe((data)=>{    
        data = data['success'];
      } , (err) => {
        if(err['error'] && err['error']['message']) alert(err['error']['message']);
        else alert("Falha interno do servidor.");
      })
      .add(() => {
        this.loading.dismiss();
      });
  }
}
