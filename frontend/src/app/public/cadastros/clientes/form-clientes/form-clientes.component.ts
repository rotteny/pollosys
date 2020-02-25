import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonToggle } from '@ionic/angular';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss'],
})
export class FormClientesComponent implements OnInit {
  
  public tipoPf:boolean = true;
  public tipoPj:boolean = false;
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  save(){
    this.modalCtrl.dismiss();
    this.messageAlertError("Methodo não implementado ainda.");
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
      this.tipoPj = false;
    } else {
      this.tipoPj = true;
    }
  }

  tipoChangePj(event: any) {
    if(event.detail.checked) {
      this.tipoPf = false;
    } else {
      this.tipoPf = true;
    }
  }
}
