import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map, delay} from 'rxjs/operators';
import { ContactoModel } from '../models/contacto.model';


@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  private url="https://fir-vermon.firebaseio.com/";

  constructor(private http:HttpClient) { }

  crearContacto(contacto:ContactoModel){
    return this.http.post(`${this.url}/contactos.json`,contacto).pipe(map((resp:any)=>{
      contacto.id=resp.name;
      return contacto;
    }));
  }


  actualizarContacto(contacto:ContactoModel){
    const contactoTemp={
      ...contacto
    };
    delete contactoTemp.id;
    return this.http.put(`${this.url}/contactos/${contacto.id}.json`,contactoTemp);
  }

  borrarContacto(id:string){
    return this.http.delete(`${this.url}/contactos/${id}.json`);

  }

  getContacto(id:string){
    return this.http.get(`${this.url}/contactos/${id}.json`);
  }

  getContactos(){
    return this.http.get(`${this.url}/contactos.json`).pipe(map(this.crearArrayContactos),delay(1500));
  }

  private crearArrayContactos(contactosObj:Object){
    const contactos:ContactoModel[]=[];
    console.log(contactosObj);
    if(contactosObj===null){
      return [];
    }

    Object.keys(contactosObj).forEach(key=>{
      const contacto:ContactoModel=contactosObj[key];
      contacto.id=key;

      contactos.push(contacto);
    });
    return contactos;
  }

  // private crearArrayTecnologias(tecnologiasObj:Object){
  //   const tecnologias:ContactoModel[]=[];
  //   console.log(tecnologiasObj);
  //   if(tecnologiasObj===null){
  //     return [];
  //   }

  //   Object.keys(tecnologiasObj).forEach(key=>{
  //     const tecnologia:ContactoModel=tecnologiasObj[key];
  //     tecnologia.id=key;
  //     tecnologias.push(tecnologia);
  //   });
  //   return tecnologias;
  // }
}
