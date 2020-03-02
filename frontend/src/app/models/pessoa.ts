export class Pessoa {
    public id : number;
    public nome : string;
    public tipo : string = 'PF';
    public documento : string;
    public telefone : string;
    public email : string;
    public empresa_id : number;

    constructor(origin? : any) {
        if(origin){
            if(typeof(origin) == "string") this.setObject(JSON.parse(origin));
            else this.setObject(origin);
        }
    }
    
    public setObject(obj: any): void {
        this.id         = obj.id;
        this.nome       = obj.nome;
        this.tipo       = obj.tipo;
        this.documento  = obj.documento;
        this.telefone   = obj.telefone;
        this.email      = obj.email;
        this.empresa_id = obj.empresa_id;
    }
}