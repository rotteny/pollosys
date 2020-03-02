import { AlertController, ModalController } from '@ionic/angular';
import { FormDocumentosFinanceirosComponent } from './form-documentos-financeiros/form-documentos-financeiros.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentos-financeiros',
  templateUrl: './documentos-financeiros.page.html',
  styleUrls: ['./documentos-financeiros.page.scss'],
})
export class DocumentosFinanceirosPage implements OnInit {

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
      message: 'Deseja realmente excluir este documento?',
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

  async incluirDocumentoFinanceiroModal() {
    const modal = await this.modalCtrl.create({
      component: FormDocumentosFinanceirosComponent
    });
    modal.present();
  }

  async atualiziarForm() {
    /* busca pelos dados da pessoa */
    this.incluirDocumentoFinanceiroModal();
  }

}
