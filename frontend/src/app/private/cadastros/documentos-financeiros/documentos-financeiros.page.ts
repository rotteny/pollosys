import { AlertController, ModalController } from '@ionic/angular';
import { FormDocumentosFinanceirosComponent } from './form-documentos-financeiros/form-documentos-financeiros.component';
import { Component, OnInit } from '@angular/core';
import { DocumentoFinanceiro } from 'src/app/models/documentoFinanceiro';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-documentos-financeiros',
  templateUrl: './documentos-financeiros.page.html',
  styleUrls: ['./documentos-financeiros.page.scss'],
})
export class DocumentosFinanceirosPage implements OnInit {
  public onLoad : boolean = false;
  public lista : Array<DocumentoFinanceiro>;
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
    
    this.wbService.getDocumentosFinanceiros(params, nextPage).subscribe( response => {    
      if(!this.lista) this.lista = [];
      this.lista = this.lista.concat(response.data as Array<DocumentoFinanceiro>);
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
    let documento = new DocumentoFinanceiro();
    this.loadModal(documento);
  }

  async excluirAlertConfirm(index:number) {
    let alert = await this.alertCtrl.create({
      header: 'Excluir',
      message: 'Deseja realmente excluir este documento?',
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
            this.wbService.deleteDocumentoFinanceiro(documento.id).subscribe( () => {    
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

  async loadModal(documento:DocumentoFinanceiro, index?:number) {
    const modal = await this.modalCtrl.create({
      component: FormDocumentosFinanceirosComponent,
      componentProps: {documento: documento}
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
