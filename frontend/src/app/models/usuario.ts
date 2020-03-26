import { Empresa } from './empresa';
export class Usuario {
    public id : number;
    public login : string;
    public is_admin: boolean;
    public empresa_id: number;
    public empresa: Empresa = new Empresa;
}