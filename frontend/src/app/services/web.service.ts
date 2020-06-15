import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  public baseUrl = 'https://www.pollosys.com.br/';
  public baseApi = 'api/v1/';
  public baseUrlApi;

  public loading = null;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { 
    this.baseUrlApi = this.baseUrl + this.baseApi;
  }

  private isLoading = false;

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      showBackdrop: true,
      message: 'Aguarde ...',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) a.dismiss();
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }

  async messageAlertError(message) {
    let error = await this.alertCtrl.create({
      header: 'Erro!',
      message: message,
      buttons: ['Cancelar']
    });
    error.present();
  }

  

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
  
  private obj2QueryString(obj : any, nextPage? : string) : string {
    let queryString = [];
    if(obj) {
      for(let c in obj) { queryString.push(c + "=" + obj[c]); }
    }
    if(queryString.length > 0) return (nextPage?"&":"?") + queryString.join("&");
    return "";
  }

  // Clientes 
  public postLogin(login:string, password:string) {
    return this.http.post(this.baseUrlApi + "login", {login: login, password: password}, {headers: this.getHeaders()});
  }

  public postEsqueciSenha(login:string) {
    return this.http.post(this.baseUrlApi + "login/senha", {login: login}, {headers: this.getHeaders()});
  }

  public getClientes(params?,nextPage?:string) : any {
    let queryString = this.obj2QueryString(params);
    if(!nextPage) nextPage = this.baseUrlApi + "clientes/list";
    return this.http.get(nextPage + queryString, {headers: this.getHeaders(true)});
  }

  public getCliente(id) : any {
    return this.http.get(this.baseUrlApi + "clientes/list/" + id , {headers: this.getHeaders(true)});
  }

  public addCliente(params) : any {
    return this.http.post(this.baseUrlApi + "clientes/add", params, {headers: this.getHeaders(true)});
  }

  public updateCliente(id, params) : any {
    return this.http.post(this.baseUrlApi + "clientes/update/" + id, params, {headers: this.getHeaders(true)});
  }

  public deleteCliente(id, params?) : any {
    return this.http.post(this.baseUrlApi + "clientes/delete/" + id , params, {headers: this.getHeaders(true)});
  }

  // Documento Financeiro 
  public getDocumentosFinanceiros(params?,nextPage?:string) : any {
    let queryString = this.obj2QueryString(params, nextPage);
    if(!nextPage) nextPage = this.baseUrlApi + "documentos_financeiros/list";
    return this.http.get(nextPage + queryString, {headers: this.getHeaders(true)});
  }

  public getDocumentosFinanceirosOptions(params?) : any {
    let queryString = this.obj2QueryString(params);
    return this.http.get(this.baseUrlApi + "documentos_financeiros/options" + queryString, {headers: this.getHeaders(true)});
  }

  public addDocumentoFinanceiro(params) : any {
    return this.http.post(this.baseUrlApi + "documentos_financeiros/add", params, {headers: this.getHeaders(true)});
  }

  public updateDocumentoFinanceiro(id, params) : any {
    return this.http.post(this.baseUrlApi + "documentos_financeiros/update/" + id, params, {headers: this.getHeaders(true)});
  }

  public deleteDocumentoFinanceiro(id, params?) : any {
    return this.http.post(this.baseUrlApi + "documentos_financeiros/delete/" + id , params, {headers: this.getHeaders(true)});
  }

  // Tabela de Preco
  public getTabelasPrecos(params?,nextPage?:string) : any {
    let queryString = this.obj2QueryString(params,nextPage);
    if(!nextPage) nextPage = this.baseUrlApi + "tabelas_precos/list";
    return this.http.get(nextPage + queryString, {headers: this.getHeaders(true)});
  }

  public getTabelasPrecosOptions(params?) : any {
    let queryString = this.obj2QueryString(params);
    return this.http.get(this.baseUrlApi + "tabelas_precos/options" + queryString, {headers: this.getHeaders(true)});
  }

  public addTabelaPreco(params) : any {
    return this.http.post(this.baseUrlApi + "tabelas_precos/add", params, {headers: this.getHeaders(true)});
  }

  public updateTabelaPreco(id, params) : any {
    return this.http.post(this.baseUrlApi + "tabelas_precos/update/" + id, params, {headers: this.getHeaders(true)});
  }

  public deleteTabelaPreco(id, params?) : any {
    return this.http.post(this.baseUrlApi + "tabelas_precos/delete/" + id , params, {headers: this.getHeaders(true)});
  }

  // Condicao de Pagamento
  public getCodicoesPagamentos(params?,nextPage?:string) : any {
    let queryString = this.obj2QueryString(params);
    if(!nextPage) nextPage = this.baseUrlApi + "condicoes_pagamentos/list";
    return this.http.get(nextPage + queryString, {headers: this.getHeaders(true)});
  }

  public getCodicoesPagamentosOptions(params?) : any {
    let queryString = this.obj2QueryString(params);
    return this.http.get(this.baseUrlApi + "condicoes_pagamentos/options" + queryString, {headers: this.getHeaders(true)});
  }

  public addCondicaoPagamento(params) : any {
    return this.http.post(this.baseUrlApi + "condicoes_pagamentos/add", params, {headers: this.getHeaders(true)});
  }

  public updateCondicaoPagamento(id, params) : any {
    return this.http.post(this.baseUrlApi + "condicoes_pagamentos/update/" + id, params, {headers: this.getHeaders(true)});
  }

  public deleteCondicaoPagamento(id, params?) : any {
    return this.http.post(this.baseUrlApi + "condicoes_pagamentos/delete/" + id , params, {headers: this.getHeaders(true)});
  }

  // Pessoa
  public getPessoaDocumento(tipo:string, documento:string) : any {
    return this.http.get(this.baseUrlApi + "pessoas/" + tipo + "/" + documento, {headers: this.getHeaders(true)});
  }

  // Empresa 
  public getEmpresas(params?,nextPage?:string) : any {
    let queryString = this.obj2QueryString(params, nextPage);
    if(!nextPage) nextPage = this.baseUrlApi + "empresas/list";
    return this.http.get(nextPage + queryString, {headers: this.getHeaders(true)});
  }

  public getEmpresasOptions(params?) : any {
    let queryString = this.obj2QueryString(params);
    return this.http.get(this.baseUrlApi + "empresas/options" + queryString, {headers: this.getHeaders(true)});
  }

  public addEmpresa(params, img?) : any {
    if(img) params['imagem'] = img;
    return this.http.post(this.baseUrlApi + "empresas/add", params, {headers: this.getHeaders(true)});
  }

  public updateEmpresa(id, params, img?) : any {
    if(img) params['imagem'] = img;
    return this.http.post(this.baseUrlApi + "empresas/update/" + id, params, {headers: this.getHeaders(true)});
  }

  public deleteEmpresa(id, params?) : any {
    return this.http.post(this.baseUrlApi + "empresas/delete/" + id , params, {headers: this.getHeaders(true)});
  }

  // Fornecedores 
  public getFornecedores(params?,nextPage?:string) : any {
    let queryString = this.obj2QueryString(params);
    if(!nextPage) nextPage = this.baseUrlApi + "fornecedores/list";
    return this.http.get(nextPage + queryString, {headers: this.getHeaders(true)});
  }

  public getFornecedor(id) : any {
    return this.http.get(this.baseUrlApi + "fornecedores/list/" + id , {headers: this.getHeaders(true)});
  }

  public addFornecedor(params) : any {
    return this.http.post(this.baseUrlApi + "fornecedores/add", params, {headers: this.getHeaders(true)});
  }

  public updateFornecedor(id, params) : any {
    return this.http.post(this.baseUrlApi + "fornecedores/update/" + id, params, {headers: this.getHeaders(true)});
  }

  public deleteFornecedor(id, params?) : any {
    return this.http.post(this.baseUrlApi + "fornecedores/delete/" + id , params, {headers: this.getHeaders(true)});
  }

  // Transportadores 
  public getTransportadores(params?,nextPage?:string) : any {
    let queryString = this.obj2QueryString(params);
    if(!nextPage) nextPage = this.baseUrlApi + "transportadores/list";
    return this.http.get(nextPage + queryString, {headers: this.getHeaders(true)});
  }

  public getTransportador(id) : any {
    return this.http.get(this.baseUrlApi + "transportadores/list/" + id , {headers: this.getHeaders(true)});
  }

  public addTransportador(params) : any {
    return this.http.post(this.baseUrlApi + "transportadores/add", params, {headers: this.getHeaders(true)});
  }

  public updateTransportador(id, params) : any {
    return this.http.post(this.baseUrlApi + "transportadores/update/" + id, params, {headers: this.getHeaders(true)});
  }

  public deleteTransportador(id, params?) : any {
    return this.http.post(this.baseUrlApi + "transportadores/delete/" + id , params, {headers: this.getHeaders(true)});
  }
  
}
