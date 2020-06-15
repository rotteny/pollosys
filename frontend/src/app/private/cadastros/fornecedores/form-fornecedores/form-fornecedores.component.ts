import { WebService } from 'src/app/services/web.service';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FornecedorModel } from 'src/app/models/fornecedor.model';
import { DocumentoFinanceiroModel } from 'src/app/models/documentoFinanceiro.model';
import { CondicaoPagamentoModel } from 'src/app/models/condicaoPagamento.model';
import { TabelaPrecoModel } from 'src/app/models/tabelaPreco.model';
import { DocumentoValidator } from 'src/app/validators/documento.validator';
import { EstadoModel } from 'src/app/models/estado.model';

@Component({
  selector: 'app-form-fornecedores',
  templateUrl: './form-fornecedores.component.html',
  styleUrls: ['./form-fornecedores.component.scss'],
})
export class FormFornecedoresComponent implements OnInit {
  public fornecedor: FornecedorModel = new FornecedorModel();
  public pessoa;
  public documentosFinanceiros: Array<DocumentoFinanceiroModel> = [];
  public codicoesPagamento: Array<CondicaoPagamentoModel> = [];
  public tabelasPrecos: Array<TabelaPrecoModel> = [];
  public fGroup: FormGroup;
  public estados: EstadoModel = new EstadoModel();
  
  constructor(
    private fBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService
  ) { 
    this.fGroup = this.fBuilder.group({
      'id': [this.fornecedor.pessoa.id, Validators.compose([])],
      'condicao_pagamento_id': [this.fornecedor.condicao_pagamento_id, Validators.compose([
        Validators.required
      ])],
      'documento_financeiro_id': [this.fornecedor.documento_financeiro_id, Validators.compose([
        Validators.required
      ])],

      'codigo': [this.fornecedor.pessoa.codigo, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])],
      'razao_social': [this.fornecedor.pessoa.razao_social, Validators.compose([
        Validators.required,
        Validators.maxLength(200)
      ])],
      'nome_fantasia': [this.fornecedor.pessoa.nome_fantasia, Validators.compose([
        Validators.maxLength(200)
      ])],
      'documento': [this.fornecedor.pessoa.documento, Validators.compose([
        Validators.required,
        DocumentoValidator.cpf_cnpj
      ])],
      'inscricao_estadual': [this.fornecedor.pessoa.inscricao_estadual, Validators.compose([
        Validators.maxLength(20)
      ])],
      'cep': [this.fornecedor.pessoa.cep, Validators.compose([
        Validators.maxLength(10)
      ])],
      'endereco': [this.fornecedor.pessoa.endereco, Validators.compose([
        Validators.maxLength(200)
      ])],
      'complemento': [this.fornecedor.pessoa.complemento, Validators.compose([
        Validators.maxLength(200)
      ])],
      'bairro': [this.fornecedor.pessoa.bairro, Validators.compose([
        Validators.maxLength(200)
      ])],
      'cidade': [this.fornecedor.pessoa.cidade, Validators.compose([
        Validators.maxLength(200)
      ])],
      'estado': [this.fornecedor.pessoa.estado, Validators.compose([
        Validators.maxLength(2)
      ])],
      'telefone': [this.fornecedor.pessoa.telefone, Validators.compose([
        Validators.maxLength(20)
      ])],
      'email': [this.fornecedor.pessoa.email, Validators.compose([
        Validators.maxLength(200),
        Validators.email
      ])],
      'pessoa': [this.fornecedor.pessoa.pessoa, Validators.compose([
        Validators.required,
        Validators.pattern("F|J")
      ])]
    });
  }

  ngOnInit() {
    this.fGroup.get('id').setValue(this.fornecedor.pessoa.id);
    this.fGroup.get('codigo').setValue(this.fornecedor.pessoa.codigo);
    this.fGroup.get('razao_social').setValue(this.fornecedor.pessoa.razao_social);
    this.fGroup.get('nome_fantasia').setValue(this.fornecedor.pessoa.nome_fantasia);
    this.fGroup.get('inscricao_estadual').setValue(this.fornecedor.pessoa.inscricao_estadual);
    this.fGroup.get('documento').setValue(this.fornecedor.pessoa.documento);
    this.fGroup.get('cep').setValue(this.fornecedor.pessoa.cep);
    this.fGroup.get('endereco').setValue(this.fornecedor.pessoa.endereco);
    this.fGroup.get('complemento').setValue(this.fornecedor.pessoa.complemento);
    this.fGroup.get('bairro').setValue(this.fornecedor.pessoa.bairro);
    this.fGroup.get('cidade').setValue(this.fornecedor.pessoa.cidade);
    this.fGroup.get('estado').setValue(this.fornecedor.pessoa.estado);
    this.fGroup.get('telefone').setValue(this.fornecedor.pessoa.telefone);
    this.fGroup.get('email').setValue(this.fornecedor.pessoa.email);
    this.fGroup.get('pessoa').setValue(this.fornecedor.pessoa.pessoa);
    this.pessoa = this.fornecedor.pessoa.pessoa;

    this.wbService.getCodicoesPagamentosOptions().subscribe( response => {    
      this.codicoesPagamento = this.codicoesPagamento.concat(response as Array<CondicaoPagamentoModel>);
      setTimeout(() => {
        this.fGroup.get('condicao_pagamento_id').setValue(this.fornecedor.condicao_pagamento_id);
      }, 100);
    } , response => {
      console.error(response['error']);
    });

    this.wbService.getDocumentosFinanceirosOptions().subscribe( response => {    
      this.documentosFinanceiros = this.documentosFinanceiros.concat(response as Array<DocumentoFinanceiroModel>);
      setTimeout(() => {
        this.fGroup.get('documento_financeiro_id').setValue(this.fornecedor.documento_financeiro_id);
      }, 100);
    } , response => {
      console.error(response['error']);
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  submitForm() {
    this.fGroup.value.documento = this.fGroup.value.documento.replace(/\.|\-|\//g, '').trim();
    this.fGroup.value.cep = this.fGroup.value.cep.replace(/\.|\-|\//g, '').trim();
    this.fGroup.value.telefone = this.fGroup.value.telefone.replace(/\(|\-|\)/g, '').trim();
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
            if(this.fornecedor.id) {
              this.wbService.updateFornecedor(this.fornecedor.id,this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['fornecedor'] as FornecedorModel);
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
              this.wbService.addFornecedor(this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['fornecedor'] as FornecedorModel);
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

  onChangePessoa(input) {
    this.pessoa = input.target.value;
    this.fGroup.get('documento').setValue("");
  }
}
