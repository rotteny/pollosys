import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { WebService } from 'src/app/services/web.service';
import { TabelaPrecoModel } from 'src/app/models/tabelaPreco.model';
import { FormPrecosComponent } from './form-precos/form-precos.component';

@Component({
  selector: 'app-precos',
  templateUrl: './precos.page.html',
  styleUrls: ['./precos.page.scss'],
})
export class PrecosPage implements OnInit {
  public onLoad : boolean = false;
  public lista : Array<TabelaPrecoModel>;
  public nextPage : string;
  public strSearch : string;
  public dataOrdem : string = "id|asc";

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService) {
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
    
    this.wbService.getTabelasPrecos(params, nextPage).subscribe( response => {    
      if(!this.lista) this.lista = [];
      this.lista = this.lista.concat(response.data as Array<TabelaPrecoModel>);
      this.nextPage = response.next_page_url;
    } , response => {
      if(response['error'] && response['error']['message']) this.wbService.messageAlertError(response['error']['message']);
      else this.wbService.messageAlertError("Falha interno do servidor.");
    }, () => {
      this.onLoad = false;
      if(callback) callback();
    });
  }

  async incluir() {
    let preco = new TabelaPrecoModel();
    this.loadModal(preco);
  }

  async excluirAlertConfirm(index:number) {
    let alert = await this.alertCtrl.create({
      header: 'Excluir',
      message: 'Deseja realmente excluir esta tabela de preços?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => { }
        }, {
          text: 'Sim',
          handler: () => {
            this.wbService.presentLoading();
            let documento = this.lista[index];
            this.wbService.deleteTabelaPreco(documento.id).subscribe( () => {    
              this.lista.splice(index, 1);
            } , response => {
              if(response['status'] == 404) this.wbService.messageAlertError("Cadastro indispónível.");
              else if(response['error'] && response['error']['error']) this.wbService.messageAlertError(response['error']['error']);
              else this.wbService.messageAlertError("Falha interno do servidor.");
            } , () => {
              this.wbService.dismissLoading();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async loadModal(precos:TabelaPrecoModel, index?:number) {
    const modal = await this.modalCtrl.create({
      component: FormPrecosComponent,
      componentProps: {precos: precos}
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
        label: 'Data Decrescente',
        value: 'id|desc'
      },
      {
        name: 'ordem',
        type: 'radio',
        label: 'Descrição Crescente',
        value: 'razao_social|asc',
      },
      {
        name: 'ordem',
        type: 'radio',
        label: 'Descrição Decrescente',
        value: 'razao_social|desc'
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
