import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormTransportadoresComponent } from './form-transportadores/form-transportadores.component';

@Component({
  selector: 'app-transportadores',
  templateUrl: './transportadores.page.html',
  styleUrls: ['./transportadores.page.scss'],
})
export class TransportadoresPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

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
      message: 'Deseja realmente excluir este transportador?',
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

  async incluirTransportadorModal() {
    const modal = await this.modalCtrl.create({
      component: FormTransportadoresComponent
    });
    modal.present();
  }

  async incluirAlertForm() {
    let form = await this.alertCtrl.create({
      header: 'Novo',
      message: 'Informe o CPF/CNPJ do novo transportador',
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
            this.incluirTransportadorModal();
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
    this.incluirTransportadorModal();
  }

}
