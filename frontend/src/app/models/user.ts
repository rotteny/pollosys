export class User {
    public id : number;
    public nome : string;
    public email : string;
    public telefone : string;
    public is_admin: boolean;
    public empresa_id: number;
    public imagem_url: string;

    constructor(origin? : any) {
        if(origin){
            if(typeof(origin) == "string") this.setObject(JSON.parse(origin));
            else this.setObject(origin);
        }
    }

    public setObject(obj: any): void {
        this.id         = obj.id;
        this.nome       = obj.nome;
        this.email      = obj.email;
        this.telefone   = obj.telefone;
        this.is_admin   = obj.is_admin;
        this.empresa_id = obj.empresa_id;
        this.imagem_url = obj.imagem_url;
    }
}