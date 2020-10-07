import { Component, OnInit } from '@angular/core';
import { ContactoModel } from 'src/app/models/contacto.model';
import { ContactosService } from 'src/app/services/contactos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  contactos:ContactoModel[]=[];
  cargando=false;

  constructor(private contactosService:ContactosService) { }

  ngOnInit(): void {

    this.cargando=true;
    this.contactosService.getContactos().subscribe(resp=>{
      this.contactos=resp
      this.cargando=false});
  }

  borrarContacto(contacto:ContactoModel, i:number){

    Swal.fire({
      title: '¿Esta seguro?',
      text:`Esta seguro que desea borrar a ${contacto.nombre}`,
      showCancelButton: true,
      showConfirmButton:true 
    }).then(resp=>{
      if(resp.value){
        this.contactos.splice(i,1);
        this.contactosService.borrarContacto(contacto.id).subscribe();
      }
    });

  }
}
