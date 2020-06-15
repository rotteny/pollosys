import { CondicaoPagamentoModel } from './condicaoPagamento.model';
import { DocumentoFinanceiroModel } from './documentoFinanceiro.model';
import { PessoaModel } from './pessoa.model';
export class FornecedorModel {
    public id : number;
    public documento_financeiro_id : number;
    public condicao_pagamento_id : number;
    public documento_financeiro : DocumentoFinanceiroModel = new DocumentoFinanceiroModel;
    public condicao_pagamento : CondicaoPagamentoModel = new CondicaoPagamentoModel;
    public pessoa : PessoaModel = new PessoaModel;
}