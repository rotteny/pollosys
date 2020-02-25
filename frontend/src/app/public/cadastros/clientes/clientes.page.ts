import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  abrirMenu() {
    alert('Menu');  
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
          handler: () => {}
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

  async incluirAlertForm() {
    let form = await this.alertCtrl.create({
      header: 'Novo',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome do Cliente'
        },
        {
          name: 'documento',
          type: 'text',
          placeholder: 'CPF/CNPJ'
        },
        {
          name: 'telefone',
          type: 'text',
          placeholder: '(dd)9xxxx-xxxx'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'E-mail(opcional)'
        },  
      ],
      buttons: [
        {
          text: 'Calcelar',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Salvar',
          handler: () => {
            this.messageAlertError("Methodo não implementado ainda.");
            return false;
          }
        }
      ]
    });
    await form.present();
  }

  async atualiziarAlertForm() {
    let form = await this.alertCtrl.create({
      header: 'Atualizar',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome do Cliente',
          value: 'Ana Cristina'
        },
        {
          name: 'documento',
          type: 'text',
          placeholder: 'CPF/CNPJ',
          value: '12345678901'
        },
        {
          name: 'telefone',
          type: 'text',
          placeholder: 'Telefone',
          value: '981588121'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'E-mail (opcional)'
        },  
      ],
      buttons: [
        {
          text: 'Calcelar',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Salvar',
          handler: () => {
            this.messageAlertError("Methodo não implementado ainda.");
            return false;
          }
        }
      ]
    });
    await form.present();
  }
}
