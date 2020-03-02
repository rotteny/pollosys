import { Cliente } from './../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss'],
})
export class FormClientesComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public tipoPf: boolean = true;
  public tipoPj: boolean = false;
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController  
  ) { }

  ngOnInit() {
    if(this.cliente.tipo == 'PJ') {
      this.tipoPf   = false;
      this.tipoPj   = true
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  submitForm(){
    this.alertConfirm();
    // this.messageAlertError("Methodo não implementado ainda.");
  }

  async alertConfirm() {
    let alert = await this.alertCtrl.create({
      header: 'Salvar',
      message: 'Deseja salvar os dados informados?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => { }
        }, {
          text: 'Sim',
          handler: () => {
            this.modalCtrl.dismiss(this.cliente);
          }
        }
      ]
    });
    await alert.present();
  }

  async messageAlertError(message) {
    let error = await this.alertCtrl.create({
      header: 'Erro!',
      message: message,
      buttons: ['Cancelar']
    });
    error.present();
  }

  tipoChangePf(event: any) {
    if(event.detail.checked) {
      this.cliente.tipo = "PF";
      this.tipoPj = false;
    } else {
      this.cliente.tipo = "PJ";
      this.tipoPj = true;
    }
  }

  tipoChangePj(event: any) {
    if(event.detail.checked) {
      this.cliente.tipo = "PJ";
      this.tipoPf = false;
    } else {
      this.cliente.tipo = "PF";
      this.tipoPf = true;
    }
  }
}
