import { Component, OnInit } from '@angular/core';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController, Platform, ActionSheetController } from '@ionic/angular';
import { WebService } from 'src/app/services/web.service';
import { File } from '@ionic-native/File/ngx';
// import { WebView } from '@ionic-native/ionic-webview/ngx';
// import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-form-empresas',
  templateUrl: './form-empresas.component.html',
  styleUrls: ['./form-empresas.component.scss'],
})
export class FormEmpresasComponent implements OnInit {

  public empresa: EmpresaModel = new EmpresaModel();
  public fGroup: FormGroup;
  public imagem_url;
  private newImg;

  constructor(
    private fBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService) { 
      this.fGroup = this.fBuilder.group({
        'nome': [this.empresa.nome, Validators.compose([
          Validators.required,
          Validators.maxLength(200)
        ])],
        'responsavel': [this.empresa.responsavel, Validators.compose([
          Validators.required,
          Validators.maxLength(200)
        ])]
      });
    }

  ngOnInit() {
    this.fGroup.get('nome').setValue(this.empresa.nome);
    this.fGroup.get('responsavel').setValue(this.empresa.responsavel);
    if(this.empresa.imagem_url) {
      this.imagem_url = this.wbService.baseUrl + this.empresa.imagem_url;
    } 
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
            if(this.empresa.id) {
              this.wbService.updateEmpresa(this.empresa.id,this.fGroup.value, this.newImg).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['empresa'] as EmpresaModel);
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
              this.wbService.addEmpresa(this.fGroup.value, this.newImg).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['empresa'] as EmpresaModel);
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

  loadImg(fileInput: any) {
    //trae imagen de la galeria 
    this.preview(fileInput.target.files[0]);
  }

  preview(fileData) {
    if (fileData['type'].match(/image\/*/) == null) return;

    let reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (_event) => { 
      this.newImg = reader.result; 
      this.imagem_url = (reader.result as string);
    }
  }

}
