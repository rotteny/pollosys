import { WebService } from './../../../services/web.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormFornecedoresComponent } from './form-fornecedores/form-fornecedores.component';
import { PessoaModel } from 'src/app/models/pessoa.model';
import { FornecedorModel } from 'src/app/models/fornecedor.model';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.page.html',
  styleUrls: ['./fornecedores.page.scss'],
})
export class FornecedoresPage implements OnInit {
  public onLoad : boolean = false;
  public lista : Array<FornecedorModel>;
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
    
    this.wbService.getFornecedores(params, nextPage).subscribe( response => {    
      if(!this.lista) this.lista = [];
      this.lista = this.lista.concat(response.data as Array<FornecedorModel>);
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

  async excluirAlertConfirm(index:number) {
    let alert = await this.alertCtrl.create({
      header: 'Excluir',
      message: 'Deseja realmente excluir este fornecedor?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => { }
        }, {
          text: 'Sim',
          handler: () => {
            this.wbService.presentLoading();
            let fornecedor = this.lista[index];
            this.wbService.deleteFornecedor(fornecedor.id).subscribe( () => {    
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

  async loadModal(fornecedor:FornecedorModel, index?:number) {
    const modal = await this.modalCtrl.create({
      component: FormFornecedoresComponent,
      componentProps: {fornecedor: fornecedor}
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if(data) {
      if(!isNaN(index)) this.lista[index] = data;
      else this.lista.push(data);
    }
  }

  async incluirAlertForm() {
    let form = await this.alertCtrl.create({
      header: 'Novo',
      message: 'Informe o CPF/CNPJ do novo fornecedor',
      inputs: [
        {
          name: 'documento',
          type: 'text',
          placeholder: 'CPF/CNPJ'
        },
      ],
      buttons: [
        {
          text: 'Novo',
          handler: (data) => {
            let fornecedor = new FornecedorModel();
            this.loadModal(fornecedor);
          }
        }, { 
          text: 'Buscar',
          handler: (data) => {
            if(!data.documento) {
              this.wbService.messageAlertError("Documento não informado.");
              return false;
            }
            this.wbService.presentLoading();
            this.wbService.getPessoaDocumento('fornecedor',data.documento).subscribe( response => {    
              let fornecedor = new FornecedorModel();
              fornecedor.pessoa = (response.pessoa as PessoaModel);
              this.loadModal(fornecedor);
              this.wbService.dismissLoading();
              form.dismiss();
            } , response => {
              this.wbService.dismissLoading();
              if(response['status'] == 404) this.wbService.messageAlertError("Cadastro indispónível.");
              else if(response['error'] && response['error']['error']) this.wbService.messageAlertError(response['error']['error']);
              else this.wbService.messageAlertError("Falha interno do servidor.");
            });
            return false;
          }
        }, {
          text: 'Calcelar',
          role: 'cancel'
        }
      ]
    });
    await form.present();
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
        label: 'Código Crescente',
        value: 'codigo|asc',
      },
      {
        name: 'ordem',
        type: 'radio',
        label: 'Código Decrescente',
        value: 'codigo|desc',
      },
      {
        name: 'ordem',
        type: 'radio',
        label: 'Nome Crescente',
        value: 'razao_social|asc',
      },
      {
        name: 'ordem',
        type: 'radio',
        label: 'Nome Decrescente',
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
