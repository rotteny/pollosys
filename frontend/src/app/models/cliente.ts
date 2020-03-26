import { CondicaoPagamento } from './condicaoPagamento';
import { TabelaPreco } from './tabelaPreco';
import { DocumentoFinanceiro } from './documentoFinanceiro';
import { Pessoa } from './pessoa';
export class Cliente {
    public id : number;
    public codigo : string;
    public documento_financeiro_id : number;
    public tabela_preco_id : number;
    public condicao_pagamento_id : number;
    public documento_financeiro : DocumentoFinanceiro;
    public tabela_preco : TabelaPreco;
    public condicao_pagamento : CondicaoPagamento;
    public pessoa : Pessoa = new Pessoa;
}