import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { WebService } from 'src/app/services/web.service';
import { CondicaoPagamento } from 'src/app/models/condicaoPagamento';

@Component({
  selector: 'app-form-condicoes-pagamento',
  templateUrl: './form-condicoes-pagamento.component.html',
  styleUrls: ['./form-condicoes-pagamento.component.scss'],
})
export class FormCondicoesPagamentoComponent implements OnInit {
  public condicao: CondicaoPagamento = new CondicaoPagamento();
  public fGroup: FormGroup;

  constructor(
    private fBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService) { 
      this.fGroup = this.fBuilder.group({
        'descricao': [this.condicao.descricao, Validators.compose([
          Validators.required,
          Validators.maxLength(200)
        ])],
        'numero_parcelas': [this.condicao.numero_parcelas, Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]+')
        ])],
        'dia_primeira_parcela': [this.condicao.dia_primeira_parcela, Validators.compose([
          Validators.required,
          Validators.pattern('([0-9]|[12][0-9]|3[01])')
        ])]
      });
    }

  ngOnInit() {
    this.fGroup.get('descricao').setValue(this.condicao.descricao);
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
            if(this.condicao.id) {
              this.wbService.updateCondicaoPagamento(this.condicao.id,this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['condicaoPagamento'] as CondicaoPagamento);
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
              this.wbService.addCondicaoPagamento(this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['condicaoPagamento'] as CondicaoPagamento);
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
