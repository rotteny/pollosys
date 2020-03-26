import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private baseUrl = 'https://www.pollosys.com.br/ws/public/api/v1/';

  public loading = null;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  private getHeaders(author?) {
    if(author)
      return new HttpHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.authService.apiToken,
      });
    else 
      return new HttpHeaders({
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      });
  }

  public postLogin(login:string, password:string) {
    return this.http.post(this.baseUrl + "login", {login: login, password: password}, {headers: this.getHeaders()});
  }

  private obj2QueryString(obj : any) : string {
    let queryString = [];
    if(obj) {
      for(let c in obj) {
        queryString.push(c + "=" + obj[c]);
      }
    }
    if(queryString.length > 0) return "?" + queryString.join("&");
    return "";
  }

  public getClientes(params?,nextPage?:string) : any {
    let queryString = this.obj2QueryString(params);
    if(!nextPage) nextPage = this.baseUrl + "clientes";
    return this.http.get(nextPage + queryString, {headers: this.getHeaders(true)});
  }

  public getPessoaDocumento(tipo:string, documento:string) : any {
    return this.http.get(this.baseUrl + "pessoas/" + tipo + "/" + documento, {headers: this.getHeaders(true)});
  }
}
