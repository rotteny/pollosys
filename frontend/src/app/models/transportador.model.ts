import { PessoaModel } from './pessoa.model';
export class TransportadorModel {
    public id : number;
    public pessoa : PessoaModel = new PessoaModel;
}