import { Pessoa } from './../../../../models/pessoa';
import { DocumentoValidator } from './../../../../validators/documento.validator';
import { TabelaPreco } from './../../../../models/tabelaPreco';
import { CondicaoPagamento } from './../../../../models/condicaoPagamento';
import { WebService } from './../../../../services/web.service';
import { Cliente } from './../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentoFinanceiro } from 'src/app/models/documentoFinanceiro';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss'],
})
export class FormClientesComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public pessoa;
  public documentosFinanceiros: Array<DocumentoFinanceiro> = [];
  public codicoesPagamento: Array<CondicaoPagamento> = [];
  public tabelasPrecos: Array<TabelaPreco> = [];
  public fGroup: FormGroup;
  public estados = [
    {"nome": "Acre", "sigla": "AC"},
    {"nome": "Alagoas", "sigla": "AL"},
    {"nome": "Amapá", "sigla": "AP"},
    {"nome": "Amazonas", "sigla": "AM"},
    {"nome": "Bahia", "sigla": "BA"},
    {"nome": "Ceará", "sigla": "CE"},
    {"nome": "Distrito Federal", "sigla": "DF"},
    {"nome": "Espírito Santo", "sigla": "ES"},
    {"nome": "Goiás", "sigla": "GO"},
    {"nome": "Maranhão", "sigla": "MA"},
    {"nome": "Mato Grosso", "sigla": "MT"},
    {"nome": "Mato Grosso do Sul", "sigla": "MS"},
    {"nome": "Minas Gerais", "sigla": "MG"},
    {"nome": "Pará", "sigla": "PA"},
    {"nome": "Paraíba", "sigla": "PB"},
    {"nome": "Paraná", "sigla": "PR"},
    {"nome": "Pernambuco", "sigla": "PE"},
    {"nome": "Piauí", "sigla": "PI"},
    {"nome": "Rio de Janeiro", "sigla": "RJ"},
    {"nome": "Rio Grande do Norte", "sigla": "RN"},
    {"nome": "Rio Grande do Sul", "sigla": "RS"},
    {"nome": "Rondônia", "sigla": "RO"},
    {"nome": "Roraima", "sigla": "RR"},
    {"nome": "Santa Catarina", "sigla": "SC"},
    {"nome": "São Paulo", "sigla": "SP"},
    {"nome": "Sergipe", "sigla": "SE"},
    {"nome": "Tocantins", "sigla": "TO"}
  ];
  
  constructor(
    private fBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private wbService: WebService
  ) { 
    this.fGroup = this.fBuilder.group({
      'id': [this.cliente.pessoa.id, Validators.compose([])],
      'condicao_pagamento_id': [this.cliente.condicao_pagamento_id, Validators.compose([
        Validators.required
      ])],
      'tabela_preco_id': [this.cliente.tabela_preco_id, Validators.compose([
        Validators.required
      ])],
      'documento_financeiro_id': [this.cliente.documento_financeiro_id, Validators.compose([
        Validators.required
      ])],

      'codigo': [this.cliente.pessoa.codigo, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])],
      'razao_social': [this.cliente.pessoa.razao_social, Validators.compose([
        Validators.required,
        Validators.maxLength(200)
      ])],
      'nome_fantasia': [this.cliente.pessoa.nome_fantasia, Validators.compose([
        Validators.maxLength(200)
      ])],
      'documento': [this.cliente.pessoa.documento, Validators.compose([
        Validators.required,
        DocumentoValidator.cpf_cnpj
      ])],
      'inscricao_estadual': [this.cliente.pessoa.inscricao_estadual, Validators.compose([
        Validators.maxLength(20)
      ])],
      'cep': [this.cliente.pessoa.cep, Validators.compose([
        Validators.maxLength(10)
      ])],
      'endereco': [this.cliente.pessoa.endereco, Validators.compose([
        Validators.maxLength(200)
      ])],
      'complemento': [this.cliente.pessoa.complemento, Validators.compose([
        Validators.maxLength(200)
      ])],
      'bairro': [this.cliente.pessoa.bairro, Validators.compose([
        Validators.maxLength(200)
      ])],
      'cidade': [this.cliente.pessoa.cidade, Validators.compose([
        Validators.maxLength(200)
      ])],
      'estado': [this.cliente.pessoa.estado, Validators.compose([
        Validators.maxLength(2)
      ])],
      'telefone': [this.cliente.pessoa.telefone, Validators.compose([
        Validators.maxLength(20)
      ])],
      'email': [this.cliente.pessoa.email, Validators.compose([
        Validators.maxLength(200),
        Validators.email
      ])],
      'pessoa': [this.cliente.pessoa.pessoa, Validators.compose([
        Validators.required,
        Validators.pattern("F|J")
      ])]
    });
  }

  ngOnInit() {
    this.fGroup.get('id').setValue(this.cliente.pessoa.id);
    this.fGroup.get('codigo').setValue(this.cliente.pessoa.codigo);
    this.fGroup.get('razao_social').setValue(this.cliente.pessoa.razao_social);
    this.fGroup.get('nome_fantasia').setValue(this.cliente.pessoa.nome_fantasia);
    this.fGroup.get('inscricao_estadual').setValue(this.cliente.pessoa.inscricao_estadual);
    this.fGroup.get('documento').setValue(this.cliente.pessoa.documento);
    this.fGroup.get('cep').setValue(this.cliente.pessoa.cep);
    this.fGroup.get('endereco').setValue(this.cliente.pessoa.endereco);
    this.fGroup.get('complemento').setValue(this.cliente.pessoa.complemento);
    this.fGroup.get('bairro').setValue(this.cliente.pessoa.bairro);
    this.fGroup.get('cidade').setValue(this.cliente.pessoa.cidade);
    this.fGroup.get('estado').setValue(this.cliente.pessoa.estado);
    this.fGroup.get('telefone').setValue(this.cliente.pessoa.telefone);
    this.fGroup.get('email').setValue(this.cliente.pessoa.email);
    this.fGroup.get('pessoa').setValue(this.cliente.pessoa.pessoa);
    this.pessoa = this.cliente.pessoa.pessoa;

    this.wbService.getCodicoesPagamentosOptions().subscribe( response => {    
      this.codicoesPagamento = this.codicoesPagamento.concat(response as Array<CondicaoPagamento>);
      setTimeout(() => {
        this.fGroup.get('condicao_pagamento_id').setValue(this.cliente.condicao_pagamento_id);
      }, 100);
    } , response => {
      console.error(response['error']);
    });

    this.wbService.getTabelasPrecosOptions().subscribe( response => {    
      this.tabelasPrecos = this.tabelasPrecos.concat(response as Array<TabelaPreco>);
      setTimeout(() => {
        this.fGroup.get('tabela_preco_id').setValue(this.cliente.tabela_preco_id);
      }, 100);
    } , response => {
      console.error(response['error']);
    });

    this.wbService.getDocumentosFinanceirosOptions().subscribe( response => {    
      this.documentosFinanceiros = this.documentosFinanceiros.concat(response as Array<DocumentoFinanceiro>);
      setTimeout(() => {
        this.fGroup.get('documento_financeiro_id').setValue(this.cliente.documento_financeiro_id);
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
            if(this.cliente.id) {
              this.wbService.updateCliente(this.cliente.id,this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['cliente'] as Cliente);
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
              this.wbService.addCliente(this.fGroup.value).subscribe( response => {
                this.modalCtrl.dismiss(response['success']['cliente'] as Cliente);
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
