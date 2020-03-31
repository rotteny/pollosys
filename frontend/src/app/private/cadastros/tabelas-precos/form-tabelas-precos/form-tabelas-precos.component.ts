import { Component, OnInit } from '@angular/core';
import { TabelaPreco } from 'src/app/models/tabelaPreco';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-form-tabelas-precos',
  templateUrl: './form-tabelas-precos.component.html',
  styleUrls: ['./form-tabelas-precos.component.scss'],
})
export class FormTabelasPrecosComponent implements OnInit {
  public preco: TabelaPreco = new TabelaPreco();
  public fGroup: FormGroup;

  constructor(
    private fBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService) { 
      this.fGroup = this.fBuilder.group({
        'descricao': [this.preco.descricao, Validators.compose([
          Validators.required,
          Validators.maxLength(200)
        ])],
      });
    }

  ngOnInit() {
    this.fGroup.get('descricao').setValue(this.preco.descricao);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  submitForm() {
    this.alertConfirm();
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
            this.wbService.presentLoading();
            if(this.preco.id) {
              this.wbService.updateTabelaPreco(this.preco.id,this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['tabelaPreco'] as TabelaPreco);
                this.wbService.dismissLoading();
              } , response => {
                this.wbService.dismissLoading();
                if(response['error'] && typeof response['error']['error'] == 'object') {
                  let errors = [];
                  for(let i in response['error']['error']) errors.push(response['error']['error'][i].join('<br>'));
                  this.wbService.messageAlertError(errors.join('<br>'));
                }
                else this.wbService.messageAlertError("Falha interno do servidor.");
              });
            } else {
              this.wbService.addTabelaPreco(this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['tabelaPreco'] as TabelaPreco);
                this.wbService.dismissLoading();
              } , response => {
                this.wbService.dismissLoading();
                if(response['error'] && typeof response['error']['error'] == 'object') {
                  let errors = [];
                  for(let i in response['error']['error']) errors.push(response['error']['error'][i].join('<br>'));
                  this.wbService.messageAlertError(errors.join('<br>'));
                }
                else this.wbService.messageAlertError("Falha interno do servidor.");
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
