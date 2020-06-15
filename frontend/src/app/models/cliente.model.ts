import { CondicaoPagamentoModel } from './condicaoPagamento.model';
import { TabelaPrecoModel } from './tabelaPreco.model';
import { DocumentoFinanceiroModel } from './documentoFinanceiro.model';
import { PessoaModel } from './pessoa.model';
export class ClienteModel {
    public id : number;
    public documento_financeiro_id : number;
    public tabela_preco_id : number;
    public condicao_pagamento_id : number;
    public documento_financeiro : DocumentoFinanceiroModel = new DocumentoFinanceiroModel;
    public tabela_preco : TabelaPrecoModel = new TabelaPrecoModel;
    public condicao_pagamento : CondicaoPagamentoModel = new CondicaoPagamentoModel;
    public pessoa : PessoaModel = new PessoaModel;
}