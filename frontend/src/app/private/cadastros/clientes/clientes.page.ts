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
  clientes: Array<Cliente>;
  queryText: string;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthenticationService) 
  { }

  ngOnInit() {
  }

  async messageAlertError(message:string) {
    let error = await this.alertCtrl.create({
      header: 'Erro!',
      message: message,
      buttons: ['Cancelar']
    });
    error.present();
  }

  async excluirAlertConfirm(cliente:Cliente, index:number) {
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
      componentProps: {cliente: new Cliente(cliente)}
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
    if(this.authService.user.is_admin) {
      this.messageAlertError("Usuário Admin não pode fazer cadastros.");
    } else {
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
            handler: () => {
              /*valida documento e busca pelos dados da pessoa se ja foi criado*/
              this.clienteModal(new Cliente({empresa_id: this.authService.user.empresa_id}));
            }
          }, {
            text: 'Buscar',
            handler: () => {
              /*valida documento e busca pelos dados da pessoa se ja foi criado*/
              this.messageAlertError("O documento informado não foi encontrado. Methodo não implementado ainda.");
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
  }
}
