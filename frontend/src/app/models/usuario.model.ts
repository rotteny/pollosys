import { EmpresaModel } from './empresa.model';
export class UsuarioModel {
    public id : number;
    public login : string;
    public is_admin: boolean;
    public is_ativo: boolean;
    public empresa_id: number;
    public empresa: EmpresaModel = new EmpresaModel;
}