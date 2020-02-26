import { FormProdutosComponent } from './form-produtos/form-produtos.component';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

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
      message: 'Deseja realmente excluir este produto?',
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

  async incluirProdutoModal() {
    const modal = await this.modalCtrl.create({
      component: FormProdutosComponent
    });
    modal.present();
  }

  async atualiziarForm() {
    /* busca pelos dados da pessoa */
    this.incluirProdutoModal();
  }

}
