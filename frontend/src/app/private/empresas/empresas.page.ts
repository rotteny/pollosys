import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { AlertController, ModalController } from '@ionic/angular';
import { WebService } from 'src/app/services/web.service';
import { FormEmpresasComponent } from './form-empresas/form-empresas.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})
export class EmpresasPage implements OnInit {
  public onLoad : boolean = false;
  public lista : Array<Empresa>;
  public nextPage : string;
  public strSearch : string;
  public dataOrdem : string = "id|asc";
  public baseUrl : string;
  logoDefault:string = "assets/img/logo.jpg";

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService) { 
    this.baseUrl = wbService.baseUrl;
    this.loadData();
  }

  ngOnInit() {
  }

  loadMore(infinitScroll?) {
    if(this.nextPage) {
      this.loadData(this.nextPage, function(){
        if(infinitScroll) infinitScroll.target.complete();
      });
    } else if(infinitScroll) infinitScroll.target.complete();
  }

  loadData(nextPage?, callback?) {
    if(this.onLoad) return;
    this.onLoad = true;

    let params = {};
    if(this.strSearch) params['u'] = this.strSearch;
    if(this.dataOrdem) params['s'] = this.dataOrdem;
    
    this.wbService.getEmpresas(params, nextPage).subscribe( response => {    
      if(!this.lista) this.lista = [];
      this.lista = this.lista.concat(response.data as Array<Empresa>);
      this.nextPage = response.next_page_url;
    } , response => {
      if(response['error'] && response['error']['message']) this.wbService.messageAlertError(response['error']['message']);
      else this.wbService.messageAlertError("Falha interno do servidor.");
    }, () => {
      this.onLoad = false;
      if(!this.lista) this.lista = [];
      if(callback) callback();
    });
  }

  async incluir() {
    let empresa = new Empresa();
    this.loadModal(empresa);
  }

  async excluirAlertConfirm(index:number) {
    let alert = await this.alertCtrl.create({
      header: 'Excluir',
      message: 'Deseja realmente excluir este empresa?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => { }
        }, {
          text: 'Sim',
          handler: () => {
            this.wbService.presentLoading();
            let empresa = this.lista[index];
            this.wbService.deleteEmpresa(empresa.id).subscribe( () => {    
              this.lista.splice(index, 1);
              this.wbService.dismissLoading();
            } , response => {
              this.wbService.dismissLoading();
              if(response['status'] == 404) this.wbService.messageAlertError("Cadastro indispónível.");
              else if(response['error'] && response['error']['error']) this.wbService.messageAlertError(response['error']['error']);
              else this.wbService.messageAlertError("Falha interno do servidor.");
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async loadModal(empresa:Empresa, index?:number) {
    const modal = await this.modalCtrl.create({
      component: FormEmpresasComponent,
      componentProps: {empresa: empresa}
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if(data) {
      if(!isNaN(index)) this.lista[index] = data;
      else this.lista.push(data);
    }
  }

  filterData(filter?) {
    this.lista = null;
    this.strSearch = filter.target.value;
    this.loadData();
  }

  refreshData() {
    this.lista = null;
    this.loadData();
  }

  async ordenarAlertForm() {
    let inputList = [
      {
        name: 'ordem',
        type: 'radio',
        label: 'Data Crescente',
        value: 'id|asc',
      },
      {
        name: 'ordem',
        type: 'radio',
        label: 'Data   Decrescente',
        value: 'id|desc'
      },
      {
        name: 'ordem',
        type: 'radio',
        label: 'Descrição Crescente',
        value: 'nome|asc',
      },
      {
        name: 'ordem',
        type: 'radio',
        label: 'Descrição Decrescente',
        value: 'nome|desc'
      }
    ];
    var that = this;
    inputList.forEach(function (obj) {
      obj['checked'] = (obj.value == that.dataOrdem);
    });
    
    let form = await this.alertCtrl.create({
      header: 'Ordenação',
      inputs: (inputList as Array<Object>),
      buttons: [
        {
          text: 'Calcelar',
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: (data) => {
            this.dataOrdem = data;
            this.lista = null;
            this.loadData();
          }
        }
      ]
    });
    await form.present();
  }
}
