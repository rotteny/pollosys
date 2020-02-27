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
  clientes: Array<{ nome: string, telefone: string }>;
  todosClientes: any;
  queryText: string;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) 
  {
      this.queryText = '';
      this.clientes = [
        { nome: 'Ana Cristina', telefone: '98158-8121' },
        { nome: 'Bianca Branco', telefone: '98123-8456' },
        { nome: 'Barbara Soares', telefone: '99998-8122' },
        { nome: 'Carlos Santos', telefone: '88258-8441' },
        { nome: 'Damares Cristina', telefone: '98158-8121' },
        { nome: 'Eloisa Rosa', telefone: '98158-8121' },
        { nome: 'Janaina Almeida', telefone: '98158-8121' },
        { nome: 'Rodrigo da Silva', telefone: '98158-8121' },
        { nome: 'Pablo Villar', telefone: '98158-8121' },
        { nome: 'Wanderson Vilela', telefone: '98158-8121' }
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

  async messageAlertError(message) {
    let error = await this.alertCtrl.create({
      header: 'Erro!',
      message: message,
      buttons: ['Cancelar']
    });
    error.present();
  }

  async excluirAlertConfirm() {
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
            this.messageAlertError("Methodo não implementado ainda.");
          }
        }
      ]
    });
    await alert.present();
  }

  async incluirClienteModal() {
    const modal = await this.modalCtrl.create({
      component: FormClientesComponent
    });
    modal.present();
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
          handler: () => {
            /*valida documento e busca pelos dados da pessoa se ja foi criado*/
            this.incluirClienteModal();
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

  async atualiziarForm() {
    /* busca pelos dados da pessoa */
    this.incluirClienteModal();
  }
}
