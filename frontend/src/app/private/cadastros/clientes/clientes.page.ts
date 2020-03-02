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
  todosClientes: any;
  queryText: string;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthenticationService) 
  {
      this.queryText = '';
      this.clientes = [
        new Cliente({ id: 1, codigo: 'ANC', nome: 'Ana Cristina', email: 'teste@teste.com', telefone: '98158-8121', tipo: 'PF', documento: '01234567890' }),
        new Cliente({ id: 2, codigo: 'BIB', nome: 'Bianca Branco', email: 'teste@teste.com', telefone: '98123-8456', tipo: 'PJ', documento: '11111111111007' }),
        new Cliente({ id: 3, codigo: 'BAS', nome: 'Barbara Soares', email: 'teste@teste.com', telefone: '99998-8122', tipo: 'PF', documento: '01234567890' }),
        new Cliente({ id: 4, codigo: 'CAS', nome: 'Carlos Santos', email: 'teste@teste.com', telefone: '88258-8441', tipo: 'PF', documento: '01234567890' }),
        new Cliente({ id: 5, codigo: 'DAC', nome: 'Damares Cristina', email: 'teste@teste.com', telefone: '98158-8121', tipo: 'PF', documento: '01234567890' }),
        new Cliente({ id: 6, codigo: 'ELR', nome: 'Eloisa Rosa', email: 'teste@teste.com', telefone: '98158-8121', tipo: 'PF', documento: '01234567890' }),
        new Cliente({ id: 7, codigo: 'JAA', nome: 'Janaina Almeida', email: 'teste@teste.com', telefone: '98158-8121', tipo: 'PF', documento: '01234567890' }),
        new Cliente({ id: 8, codigo: 'ROS', nome: 'Rodrigo da Silva', email: 'teste@teste.com', telefone: '98158-8121', tipo: 'PF', documento: '01234567890' }),
        new Cliente({ id: 9, codigo: 'PAV', nome: 'Pablo Villar', email: 'teste@teste.com', telefone: '98158-8121', tipo: 'PF', documento: '01234567890' }),
        new Cliente({ id: 10, codigo: 'WAV', nome: 'Wanderson Vilela', email: 'teste@teste.com', telefone: '98158-8121', tipo: 'PF', documento: '01234567890' })  
      ];
      this.todosClientes = this.clientes;
  }
  filterCliente(cli: any) {
    let val = cli.target.value;
    if(val && val.trim() !=''){
      this.clientes = _.values(this.todosClientes);
      this.clientes = this.clientes.filter((cliente) => {
        return (cliente.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.clientes = this.todosClientes;
    }
  }

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
