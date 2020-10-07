import { AstPath } from '@angular/compiler';

export class ContactoModel{
    id:string;
    nombre:string;
    telefono:number;
    fecha_nacimiento:Date;
    tecnologias:Array<any>=[{
        angular:false,
        php:false,
        sql:false,
        asp:false,
        net:false,
        html:false,
        javascript:false,
        python:false,
        css:false,
    }];
    constructor(){
        
    }
}
