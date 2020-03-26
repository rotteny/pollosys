import { Pessoa } from './../../../models/pessoa';
import { WebService } from './../../../services/web.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { Cliente } from './../../../models/cliente';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import _ from 'lodash';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  public onLoad : boolean = false;
  public clientes : Array<Cliente>;
  public nextPage : string;
  public strSearch : string = null;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthenticationService,
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
    
    this.wbService.getClientes(params, nextPage).subscribe( data => {    
      if(!this.clientes) this.clientes = [];
      this.clientes = this.clientes.concat(data.data as Array<Cliente>);
      this.nextPage = data.next_page_url;
    } , error => {
      if(error['error'] && error['error']['message']) this.messageAlertError(error['error']['message']);
      else this.messageAlertError("Falha interno do servidor.");
    }).add(() => {
      this.onLoad = false;
      if(callback) callback();
    });
  }

  async messageAlertError(message:string) {
    let error = await this.alertCtrl.create({
      header: 'Erro!',
      message: message,
      buttons: ['Cancelar']
    });
    error.present();
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
            this.clientes.splice(index, 1);
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
      if(!isNaN(index)) {
         this.clientes[index] = data;
      } else {
        this.clientes.push(data);
      }
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
            cliente.pessoa.documento = data.documento;
            this.clienteModal(cliente);
          }
        }, {
          text: 'Buscar',
          handler: (data) => {
            this.wbService.getPessoaDocumento('cliente',data.documento).subscribe( data => {    
              let cliente = new Cliente();
              cliente.pessoa = (data.pessoa as Pessoa);
              this.clienteModal(cliente);
              form.dismiss();
            } , error => {
              if(error['status'] == 404) this.messageAlertError("Cadastro indispónível.");
              else if(error['error'] && error['error']['error']) this.messageAlertError(error['error']['error']);
              else this.messageAlertError("Falha interno do servidor.");
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

  filterCliente(filter?) {
    this.clientes = null;
    this.strSearch = filter.target.value;
    this.loadClientes();
  }
}
