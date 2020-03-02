import { Pessoa } from './pessoa';
export class Cliente extends Pessoa {
    public codigo : string;

    public setObject(obj: any): void {
        this.codigo     = obj.codigo;
        super.setObject(obj);
    }
}