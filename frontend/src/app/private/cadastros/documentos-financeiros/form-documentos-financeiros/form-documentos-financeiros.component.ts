import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { DocumentoFinanceiroModel } from 'src/app/models/documentoFinanceiro.model';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-form-documentos-financeiros',
  templateUrl: './form-documentos-financeiros.component.html',
  styleUrls: ['./form-documentos-financeiros.component.scss'],
})
export class FormDocumentosFinanceirosComponent implements OnInit {
  public documento: DocumentoFinanceiroModel = new DocumentoFinanceiroModel();
  public fGroup: FormGroup;

  constructor(
    private fBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService) { 
      this.fGroup = this.fBuilder.group({
        'descricao': [this.documento.descricao, Validators.compose([
          Validators.required,
          Validators.maxLength(200)
        ])],
      });
    }

  ngOnInit() {
    this.fGroup.get('descricao').setValue(this.documento.descricao);
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
            if(this.documento.id) {
              this.wbService.updateDocumentoFinanceiro(this.documento.id,this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['documentoFinanceiro'] as DocumentoFinanceiroModel);
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
              this.wbService.addDocumentoFinanceiro(this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['documentoFinanceiro'] as DocumentoFinanceiroModel);
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
