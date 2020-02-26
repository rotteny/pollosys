import { FormTiposMovimentacaoComponent } from './form-tipos-movimentacao/form-tipos-movimentacao.component';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipos-movimentacao',
  templateUrl: './tipos-movimentacao.page.html',
  styleUrls: ['./tipos-movimentacao.page.scss'],
})
export class TiposMovimentacaoPage implements OnInit {

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
      message: 'Deseja realmente excluir este tipo de movimentação?',
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

  async incluirTipoDeMovimentacaoModal() {
    const modal = await this.modalCtrl.create({
      component: FormTiposMovimentacaoComponent
    });
    modal.present();
  }

  async atualiziarForm() {
    /* busca pelos dados da pessoa */
    this.incluirTipoDeMovimentacaoModal();
  }

}
