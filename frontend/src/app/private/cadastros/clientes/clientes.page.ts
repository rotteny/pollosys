import { Pessoa } from './../../../models/pessoa';
import { WebService } from './../../../services/web.service';
import { Cliente } from './../../../models/cliente';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormClientesComponent } from './form-clientes/form-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  public onLoad : boolean = false;
  public clientes : Array<Cliente>;
  public nextPage : string;
  public strSearch : string;
  public dataOrdem : string = "id|asc";

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService) 
  {
    this.loadClientes();
  }

  ngOnInit() {
  }

  loadMore(infinitScroll?) {
    if(this.nextPage) {
      this.loadClientes(this.nextPage, function(){
        if(infinitScroll) infinitScroll.target.complete();
      });
    } else if(infinitScroll) infinitScroll.target.complete();
  }

  loadClientes(nextPage?, callback?) {
    if(this.onLoad) return;
    this.onLoad = true;

    let params = {};
    if(this.strSearch) params['u'] = this.strSearch;
    if(this.dataOrdem) params['s'] = this.dataOrdem;
    
    this.wbService.getClientes(params, nextPage).subscribe( response => {    
      if(!this.clientes) this.clientes = [];
      this.clientes = this.clientes.concat(response.data as Array<Cliente>);
      this.nextPage = response.next_page_url;
    } , response => {
      if(response['error'] && response['error']['message']) this.wbService.messageAlertError(response['error']['message']);
      else this.wbService.messageAlertError("Falha interno do servidor.");
    }, () => {
      this.onLoad = false;
      if(callback) callback();
    });
  }

  async excluirAlertConfirm(index:number) {
    let alert = await this.alertCtrl.create({
      header: 'Excluir',
      message: 'Deseja realmente excluir este cliente?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => { }
        }, {
          text: 'Sim',
          handler: () => {
            this.wbService.presentLoading();
            let cliente = this.clientes[index];
            this.wbService.deleteCliente(cliente.id).subscribe( () => {    
              this.clientes.splice(index, 1);
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

  async clienteModal(cliente:Cliente, index?:number) {
    const modal = await this.modalCtrl.create({
      component: FormClientesComponent,
      componentProps: {cliente: cliente}
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if(data) {
      if(!isNaN(index)) this.clientes[index] = data;
      else this.clientes.push(data);
    }
  }

  async incluirAlertForm() {
    let form = await this.alertCtrl.create({
      header: 'Novo',
      message: 'Informe o CPF/CNPJ do novo cliente',
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
            let cliente = new Cliente();
            this.clienteModal(cliente);
          }
        }, {
          text: 'Buscar',
          handler: (data) => {
            if(!data.documento) {
              this.wbService.messageAlertError("Documento não informado.");
              return false;
            }
            this.wbService.presentLoading();
            this.wbService.getPessoaDocumento('cliente',data.documento).subscribe( response => {    
              let cliente = new Cliente();
              cliente.pessoa = (response.pessoa as Pessoa);
              this.clienteModal(cliente);
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
            this.clientes = null;
            this.loadClientes();
          }
        }
      ]
    });
    await form.present();
  }

  filterClientes(filter?) {
    this.clientes = null;
    this.strSearch = filter.target.value;
    this.loadClientes();
  }

  refreshCliente() {
    this.clientes = null;
    this.loadClientes();
  }
}
